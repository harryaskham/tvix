{ pkgs ? (import <nixpkgs> {}) }:

pkgs.mkShell {
  name = "tvix-wasm";
  packages = [
    pkgs.cargo
    pkgs.cargo-machete
    pkgs.cargo-expand
    pkgs.clippy
    pkgs.hyperfine
    pkgs.pkg-config
    pkgs.rustc
    pkgs.rustfmt
    pkgs.protobuf
    pkgs.wasm-pack
    pkgs.lld_18
    pkgs.nodejs
    pkgs.runc
  ];

  shellHook = ''
    export TVIX_NIX_PATH=nixpkgs=${pkgs.path}
  '';
}
