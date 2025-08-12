with (import /embedded/collective/collective-public/pkgs/collective-lib/ext.nix).wasm;
with typed;

let
  ast = parser.parse ''let xs = { a = 1; }; in 1 + 2 == ''${toString (xs.b or xs.a + 2)'';
in ''
  AST:
  ${_p_ ast}

  Evaluated:
  ${_p_ (eval ast)}
''
