#!/usr/bin/env bash

# Script to inject initial expression into index.html
# Usage: ./inject-expression.sh <file-path> [direct-expression]
#        ./inject-expression.sh - <direct-expression>

set -e

HTML_FILE="www/index.html"

if [ ! -f "$HTML_FILE" ]; then
    echo "Error: $HTML_FILE not found"
    exit 1
fi

# Function to escape a string for JavaScript
escape_for_js() {
    local input="$1"
    # Escape backslashes, single quotes, double quotes, newlines, and other special chars
    echo "$input" | sed 's/\\/\\\\/g; s/"/\\"/g; s/'"'"'/\\'"'"'/g; s/$/\\n/g' | tr -d '\n' | sed 's/\\n$//'
}

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

# Escape the expression for JavaScript
ESCAPED_EXPRESSION=$(escape_for_js "$EXPRESSION")

# Create a temporary replacement
TEMP_FILE=$(mktemp)

# Replace the line that sets INITIAL_EXPRESSION
# Handle both the original pattern and the already-injected pattern
if grep -q "window\.INITIAL_EXPRESSION = window\.INITIAL_EXPRESSION || null;" "$HTML_FILE"; then
    # Original pattern
    sed "s#window\.INITIAL_EXPRESSION = window\.INITIAL_EXPRESSION || null;#window.INITIAL_EXPRESSION = \"$ESCAPED_EXPRESSION\";#" "$HTML_FILE" > "$TEMP_FILE"
else
    # Already injected pattern - use awk to replace multiline assignment
    awk "
        /window\.INITIAL_EXPRESSION = / {
            print \"        window.INITIAL_EXPRESSION = \\\"$ESCAPED_EXPRESSION\\\";\";
            # Skip lines until we find the closing semicolon
            while (getline > 0 && !/};?$/) { continue }
            next
        }
        { print }
    " "$HTML_FILE" > "$TEMP_FILE"
fi

# Move the temp file back
mv "$TEMP_FILE" "$HTML_FILE"

echo "Successfully injected expression into $HTML_FILE"
echo "Expression preview: ${EXPRESSION:0:100}$([ ${#EXPRESSION} -gt 100 ] && echo '...')"
