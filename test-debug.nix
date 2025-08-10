let
  args = {
    pkgs.lib = import <nixpkgs/lib>;
    pkgs.system = "x86_64-linux";
    inputs.nix-parsec = import <nix-parsec>;
    inputs.collective-public.lib.${args.pkgs.system} = 
      import <collective/collective-public/pkgs/collective-lib> args;
    traceOpts = {
      traceLevel = 3;
      enablePartialTrace = true;
      enableVerboseTrace = true;
      enableShortTrace = true;
    };
  };
  collective-lib = import <collective/pkgs/collective-lib> args;
  inherit (collective-lib) typed;
in 
with typed;
let 
  expr = "{a = 1;}";
  ast = parser.parse expr;
in
  toString ast