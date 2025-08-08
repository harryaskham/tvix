# Tvix WebAssembly Evaluator

Working expression for loading collective-lib:

``` nix
let
  system = "x86_64-linux";
  lib = import <nixpkgs/lib>;
  pkgs = { 
    inherit lib system;
  };
  args = {
    inherit lib pkgs;
    inputs = {
      nix-parsec = null;
      collective-public.packages.${pkgs.system}.collective-lib = 
        import <collective/collective-public/pkgs/collective-lib> args;
    };
  };
  collective-lib = import <collective/pkgs/collective-lib> args;
  inherit (collective-lib) typed;
in
with typed;

_b_ ''
  ${_ph_ {a = 3;}}
''
```

A WebAssembly build of the Tvix Nix expression evaluator that runs in web browsers.

## Features

- **Pure Tvix Evaluation**: Evaluates Nix expressions using the same engine as the Tvix CLI
- **Web-based Interface**: Clean, dark-themed UI for entering and evaluating expressions
- **Real-time Results**: Immediate feedback with typed output (`value :: type`)
- **Error Handling**: Displays compilation and runtime errors clearly
- **Example Expressions**: Pre-loaded examples for quick testing

## Building

### Prerequisites

You need Nix installed with the required WebAssembly toolchain:

```bash
# Enter the Nix development shell with WASM tools
nix-shell -p wasm-pack lld_18
```

### Build Steps

1. **Build the WebAssembly module:**
   ```bash
   # Set NIX_PATH for packages
   export NIX_PATH=nixpkgs=https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz
   
   # Build with wasm-pack
   nix-shell -p wasm-pack lld_18 --run "wasm-pack build --target web --out-dir pkg"
   ```

2. **Copy WASM files to web directory:**
   ```bash
   cp pkg/* www/
   ```

3. **Start the web server:**
   ```bash
   ./test-server.sh
   ```

4. **Open in browser:**
   Navigate to `http://localhost:8081`

## Usage

### Web Interface

1. **Enter Expression**: Type a Nix expression in the text area
2. **Evaluate**: Click "Evaluate" for typed output or "Evaluate (Raw)" for raw string output
3. **Examples**: Click any example button to load pre-made expressions
4. **Keyboard Shortcuts**: Press Ctrl+Enter to evaluate

### Example Expressions

- **Arithmetic**: `1 + 2 * 3`
- **Attribute Set**: `{ x = 42; y = "hello"; z = true; }`
- **List**: `[1 2 3 4 5]`
- **Function**: `map (x: x * 2) [1 2 3]`
- **Builtin**: `builtins.length [1 2 3 4]`
- **Let Expression**: `let x = 10; y = 20; in x + y`
- **Conditional**: `if true then "yes" else "no"`
- **Recursive Set**: `rec { x = 1; y = x + 1; }`

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Browser   │    │  WebAssembly    │    │   Tvix Core     │
│                 │    │                 │    │                 │
│  index.html     │───▶│  tvix_wasm.wasm │───▶│  tvix-eval      │
│  JavaScript     │    │  Rust + wasm-   │    │  Pure Nix       │
│  UI Controls    │    │  bindgen        │    │  Evaluator      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Components

- **`src/lib.rs`**: Rust WebAssembly interface using `wasm-bindgen`
- **`www/index.html`**: Single-page web application with UI
- **`pkg/`**: Generated WebAssembly module and JavaScript bindings
- **`tvix-eval`**: Core Tvix evaluator (dependency)

## Functionality

This web app provides the equivalent of running `tvix -E '<expression>'` in the browser:

- **Expression Parsing**: Uses Tvix's rnix parser
- **Type Checking**: Full Nix type system support  
- **Evaluation**: Complete Nix language semantics
- **Error Reporting**: Detailed parse and evaluation errors
- **Builtins**: Core Nix builtin functions (pure subset)

## Limitations

- **Pure Evaluation Only**: No file system access or network operations
- **No Imports**: Cannot import external Nix files
- **Limited Builtins**: Only pure builtins are available (no `fetchurl`, etc.)
- **Memory Constraints**: Runs within browser memory limits

## Files

- `src/lib.rs` - WebAssembly interface code
- `Cargo.toml` - Rust package configuration
- `www/index.html` - Web interface
- `test-server.sh` - Development server script
- `.cargo/config.toml` - WASM build configuration

## Development

To modify the evaluator:

1. Edit `src/lib.rs` for WebAssembly interface changes
2. Edit `www/index.html` for UI changes
3. Rebuild with `wasm-pack build --target web --out-dir pkg`
4. Copy new files to `www/` directory
5. Refresh browser

The build process generates:
- `tvix_wasm_bg.wasm` - WebAssembly binary
- `tvix_wasm.js` - JavaScript bindings
- `tvix_wasm.d.ts` - TypeScript definitions
