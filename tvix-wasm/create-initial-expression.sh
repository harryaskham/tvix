#!/usr/bin/env bash

# Script to create initial-expression.json from file or direct expression
# Usage: ./create-initial-expression.sh <file-path> [direct-expression]
#        ./create-initial-expression.sh - <direct-expression>

set -e

JSON_FILE="www/initial-expression.json"

if [ "$#" -eq 0 ]; then
    echo "No expression provided - removing initial expression file"
    rm -f "$JSON_FILE"
    exit 0
fi

# Get the expression content
if [ "$1" = "-" ]; then
    # Direct expression provided as second argument
    EXPRESSION="$2"
    echo "Using direct expression: ${EXPRESSION:0:50}..."
elif [ -f "$1" ]; then
    # Read from file
    echo "Reading expression from file: $1"
    EXPRESSION=$(cat "$1")
    echo "Read ${#EXPRESSION} characters from file"
else
    echo "Error: File '$1' not found and not using direct mode"
    exit 1
fi

# Create JSON file with proper escaping
cat > "$JSON_FILE" << EOF
{
  "expression": $(printf '%s' "$EXPRESSION" | jq -R -s '.')
}
EOF

echo "Successfully created $JSON_FILE"
echo "Expression preview: ${EXPRESSION:0:100}$([ ${#EXPRESSION} -gt 100 ] && echo '...')"