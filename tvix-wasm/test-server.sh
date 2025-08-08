#!/usr/bin/env bash
cd www
echo "Starting web server on http://localhost:8089"
echo "Open http://localhost:8089 in your browser to test the Tvix WebAssembly evaluator"
echo "Press Ctrl+C to stop the server"
python3 -m http.server 8089
