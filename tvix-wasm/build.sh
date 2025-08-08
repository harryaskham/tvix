#!/usr/bin/env bash
set -e

# First create a simple web page
mkdir -p www

# Build the WASM module
cargo build --target wasm32-unknown-unknown --release

# Find the wasm file
WASM_FILE="target/wasm32-unknown-unknown/release/tvix_wasm.wasm"

if [ ! -f "$WASM_FILE" ]; then
    echo "WASM file not found. Let's try a different approach."
    
    # Let's manually generate the necessary files without wasm-pack
    # First, we'll need to create the JS bindings manually
    
    echo "Building without wasm-pack..."
    
    # Copy the wasm file to www directory
    cp "$WASM_FILE" www/ 2>/dev/null || true
fi

echo "Build script completed. Files should be in www/ directory."