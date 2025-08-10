#!/usr/bin/env bash

TVIX="target/release/tvix"

NIXPKGS=$(nix eval --impure --expr '<nixpkgs>')
NIX_PARSEC=$(nix eval --raw "/home/harry/collective/collective-public#inputs.nix-parsec.outPath" 2>/dev/null)
COLLECTIVE="/home/harry/collective"

export NIX_PATH="nixpkgs=$NIXPKGS:nix-parsec=$NIX_PARSEC:collective=$COLLECTIVE"

echo "NIX_PATH: $NIX_PATH"

function header() {
  cmd="$1"; shift
  args=""
  if [[ -n "$@" ]]; then args="$@ "; fi
  echo ""
  echo "=== $cmd $args==="
}

function nix-eval() {
  EXPR="$1"; shift
  echo "$(header "nix eval --expr ...")"
  nix eval --impure --expr "$EXPR" $@
}

function nix-inst() {
  EXPR="$1"; shift
  echo "$(header "nix-instantiate --eval -E ...")"
  nix-instantiate --eval -E "$EXPR" --show-trace --trace-verbose $@
}

function tvix-eval() {
  EXPR="$1"; shift
  echo "$(header "tvix -E ..." "$@")"
  $TVIX -I $NIX_PATH --no-warnings -E "$EXPR" $@
}

function tvix-eval-strict() {
  tvix-eval "$@" "--strict"
}

function tvix-eval-nix-compat {
  tvix-eval "$@" "--nix-compat"
}

function tvix-eval-strict-nix-compat {
  tvix-eval "$@" "--strict --nix-compat"
}

EXPRS=()

# EXPRS+=("$(cat << EOF
# { e = throw "error"; }
# EOF
# )")
#
# EXPRS+=("$(cat << EOF
# let strict = x: builtins.deepSeq x x;
# in strict { e = throw "error"; }
# EOF
# )")

#EXPRS+=("$(cat nuke.nix | sed "s/0000/5555/")")
#EXPRS+=("$(cat nuke.nix | sed "s/0000/1234/")")
EXPRS+=("$(cat test-cltv.nix)")

function run-expr() {
  expr="$1"
  shift
  echo "=== Expression ==="
  echo "$expr"
  for ix in nix-inst tvix-eval-strict tvix-eval-strict-nix-compat; do
    "$ix" "$expr" "$@"
    echo ""
  done
}

for expr in "${EXPRS[@]}"; do
  run-expr "$expr" "$@"
done
