#!/usr/bin/env bash

TVIX=target/release/tvix

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
  nix eval --expr "$EXPR" $@
}

function tvix-eval() {
  EXPR="$1"; shift
  echo "$(header "tvix -E ..." "$@")"
  $TVIX -E "$EXPR" $@
}

function tvix-eval-strict() {
  tvix-eval "$@" "--strict"
}

function tvix-eval-raw() {
  tvix-eval "$@" "--raw"
}

function tvix-eval-strict-raw() {
  tvix-eval "$@" "--strict --raw"
}

function tvix-eval-nix-compat {
  tvix-eval "$@" "--nix-compat"
}

EXPRS=()

EXPRS+=("$(cat << EOF
{ e = throw "error"; }
EOF
)")

EXPRS+=("$(cat << EOF
let strict = x: builtins.deepSeq x x;
in strict { e = throw "error"; }
EOF
)")

EXPRS+=("$(cat << EOF
let strict = x: builtins.deepSeq x x;
    try = x: builtins.tryEval (strict x);
    catch = x: y: if x.success or false then x.value else y;
    launchNukes = { nukes = throw "launched"; };
    takeItEasy = { nukes = "not launched"; };
in catch (try launchNukes) takeItEasy
EOF
)")

function run-expr() {
  EXPR="$1"
  echo "=== Expression ==="
  echo "$EXPR"
  for ix in nix-eval tvix-eval tvix-eval-strict tvix-eval-nix-compat; do
    "$ix" "$EXPR"
  done
}

for expr in "${EXPRS[@]}"; do
  run-expr "$expr"
done
