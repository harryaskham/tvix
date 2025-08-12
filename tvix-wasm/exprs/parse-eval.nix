with (import /embedded/collective/collective-public/pkgs/collective-lib/ext.nix).wasm;
with typed;

let
  ast = parser.parse "{ a = 1; }";
in ''
  AST:
  ${_p_ ast}

  Evaluated:
  ${_p_ (eval ast)}
''
