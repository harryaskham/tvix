#!/usr/bin/env bash

# Create a Nix notebook from expression files
# Usage: ./create-notebook.sh expr1.nix expr2.nix ...

set -e

if [ $# -eq 0 ]; then
    echo "Usage: $0 <expression-files...>"
    echo "Example: $0 exprs/parse-eval.nix exprs/basic.nix"
    exit 1
fi

# Get the base name for the notebook from the first expression file
FIRST_FILE="$1"
BASE_NAME=$(basename "$FIRST_FILE" .nix)
OUTPUT_FILE="www/${BASE_NAME}-notebook.nixnb"

echo "Creating notebook from $# expression files..."
echo "Output: $OUTPUT_FILE"

# Start the JSON structure
cat > "$OUTPUT_FILE" << 'EOF'
{
  "title": "Generated Notebook",
  "globalSettings": {
    "strict": false,
    "nixCompat": false,
    "rawMode": false,
    "prettyPrintAst": false,
    "displayAst": false,
    "dumpBytecode": false,
    "traceRuntime": false
  },
  "cells": [
EOF

# Track if we need a comma
FIRST_CELL=true

# Process each expression file
for expr_file in "$@"; do
    if [ ! -f "$expr_file" ]; then
        echo "Warning: File not found: $expr_file"
        continue
    fi
    
    echo "Processing: $expr_file"
    
    # Add comma if not the first cell
    if [ "$FIRST_CELL" = false ]; then
        echo "    ," >> "$OUTPUT_FILE"
    fi
    FIRST_CELL=false
    
    # Get the filename for the comment
    FILENAME=$(basename "$expr_file")
    
    # Add comment cell for the file (in text mode for markdown rendering)
    cat >> "$OUTPUT_FILE" << EOF
    {
      "content": "# $FILENAME",
      "liveMode": true,
      "isTextMode": true,
      "showCode": false
    },
    {
      "content": $(jq -R -s '.' < "$expr_file"),
      "liveMode": false
    }
EOF
done

# Close the JSON structure
cat >> "$OUTPUT_FILE" << 'EOF'
  ],
  "version": "1.0"
}
EOF

# Update the title based on the number of files and first filename
if [ $# -eq 1 ]; then
    TITLE="$BASE_NAME Notebook"
else
    TITLE="Multi-Expression Notebook ($# files)"
fi

# Update the title in the JSON file
jq --arg title "$TITLE" '.title = $title' "$OUTPUT_FILE" > "${OUTPUT_FILE}.tmp"
mv "${OUTPUT_FILE}.tmp" "$OUTPUT_FILE"

echo ""
echo "✓ Notebook created successfully: $OUTPUT_FILE"
echo "  Title: $TITLE"
echo "  Cells: $(($# * 2)) (comment + expression for each file)"
echo ""
NOTEBOOK_NAME=$(basename "$OUTPUT_FILE")

echo "To use this notebook:"
echo "  1. Start the server: make serve"
echo "  2. Option A - Direct link: http://localhost:8089/notebook.html?file=$OUTPUT_FILE"
echo "  3. Option B - Manual load: http://localhost:8089/notebook.html"
echo "     Then click 'Load' and select: $OUTPUT_FILE"
echo ""