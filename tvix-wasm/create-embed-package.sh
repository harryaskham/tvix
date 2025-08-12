#!/usr/bin/env bash

# Create embeddable package for blog/website integration
# This packages all necessary files for embedding Nix evaluators

set -e

PACKAGE_DIR="tvix-embed-package"
VERSION="1.0.0"

echo "Creating embeddable Tvix package v${VERSION}..."

# Clean and create package directory
rm -rf "$PACKAGE_DIR"
mkdir -p "$PACKAGE_DIR"/{js,wasm,examples,docs}

# Copy essential files
echo "Copying core files..."
cp www/codemirror-bundle.js "$PACKAGE_DIR/js/"
cp www/nix-component.js "$PACKAGE_DIR/js/"
cp www/tvix_wasm.js "$PACKAGE_DIR/wasm/"
cp www/tvix_wasm_bg.wasm "$PACKAGE_DIR/wasm/"

# Copy example and documentation
cp www/blog-demo.html "$PACKAGE_DIR/examples/"

# Create README with integration instructions
cat > "$PACKAGE_DIR/README.md" << 'EOF'
# Tvix Embeddable Nix Evaluator

This package provides everything you need to embed interactive Nix evaluators in your blog posts or websites.

## Quick Start

1. Upload the files to your website
2. Include the required scripts in your HTML:

```html
<script src="js/codemirror-bundle.js"></script>  
<script type="module" src="js/nix-component.js"></script>
```

3. Use the `<nix-evaluator>` custom element:

```html
<nix-evaluator expression="1 + 2"></nix-evaluator>
```

## File Structure

- `js/codemirror-bundle.js` - Code editor component
- `js/nix-component.js` - Main Nix evaluator web component  
- `wasm/tvix_wasm.js` - WebAssembly Nix evaluator
- `wasm/tvix_wasm_bg.wasm` - WebAssembly binary
- `examples/blog-demo.html` - Complete usage examples
- `docs/` - Additional documentation

## Basic Usage

```html
<!-- Simple evaluator -->
<nix-evaluator expression="{ hello = 'world'; }"></nix-evaluator>

<!-- Customized evaluator -->
<nix-evaluator 
    height="300px"
    strict="true" 
    live-mode="true"
    raw-mode="false">
let
  x = 42;
in
x * 2
</nix-evaluator>
```

## Available Attributes

- `expression` - Initial Nix expression
- `height` - Component height (default: 400px)
- `live-mode` - Auto-evaluate on changes (default: true)
- `raw-mode` - Show raw output without type annotations
- `strict` - Enable strict evaluation mode
- `nix-compat` - Enable Nix compatibility mode  
- `show-controls` - Show control panel (default: true)
- `read-only` - Make editor read-only (default: false)
- `save-changes` - Emit change events (default: true)

## Events

The component emits the following events:

- `evaluation` - Fired when expression is evaluated
- `change` - Fired when editor content changes
- `setting-change` - Fired when settings are changed

```javascript
document.addEventListener('evaluation', (e) => {
    console.log('Result:', e.detail.result);
});
```

## Server Requirements

The files must be served over HTTP/HTTPS (not file://) due to WebAssembly security requirements. Most web servers work out of the box.

## Browser Support

- Modern browsers with WebAssembly support
- ES6 modules support required
- Custom elements v1 support

See examples/blog-demo.html for complete working examples.
EOF

# Create integration guide
cat > "$PACKAGE_DIR/docs/integration-guide.md" << 'EOF'
# Integration Guide

## WordPress Integration

1. Upload files to your WordPress media directory
2. Add to your theme's functions.php:

```php
function enqueue_nix_evaluator() {
    wp_enqueue_script('codemirror-bundle', '/wp-content/uploads/nix/js/codemirror-bundle.js');
    wp_enqueue_script('nix-component', '/wp-content/uploads/nix/js/nix-component.js', [], false, true);
}
add_action('wp_enqueue_scripts', 'enqueue_nix_evaluator');
```

## Static Site Generators

### Hugo

Add to your layout template:

```html
{{ if .Params.nix_evaluator }}
<script src="/js/codemirror-bundle.js"></script>
<script type="module" src="/js/nix-component.js"></script>
{{ end }}
```

### Jekyll

Add to your _includes/head.html:

```html
{% if page.nix_evaluator %}
<script src="{{ "/js/codemirror-bundle.js" | relative_url }}"></script>
<script type="module" src="{{ "/js/nix-component.js" | relative_url }}"></script>
{% endif %}
```

### Gatsby/React

Install as npm package or import directly:

```jsx
import './js/nix-component.js';

function BlogPost() {
    return (
        <div>
            <nix-evaluator expression="1 + 2" />
        </div>
    );
}
```

## Custom Styling

The component uses CSS custom properties for theming:

```css
nix-evaluator {
    --bg-primary: #2e3440;
    --bg-secondary: #3b4252;
    --border: #4c566a;
    --text-primary: #d8dee9;
    --accent: #88c0d0;
    --success: #a3be8c;
    --error: #bf616a;
}
```

## Performance Optimization

- The WASM module is shared across all components on the page
- Components are lazy-loaded and only initialize when needed
- Consider loading scripts asynchronously for better page performance

## Security Considerations

- All evaluation happens client-side in WebAssembly
- No server-side execution or data transmission
- Safe sandboxed environment
- No file system or network access from Nix expressions
EOF

# Create minified HTML example
cat > "$PACKAGE_DIR/examples/minimal.html" << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Minimal Nix Evaluator Example</title>
    <style>
        body { font-family: sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        nix-evaluator { margin: 20px 0; }
    </style>
</head>
<body>
    <h1>Minimal Example</h1>
    <p>This is the simplest possible integration:</p>
    
    <nix-evaluator expression="1 + 2"></nix-evaluator>
    
    <p>With custom settings:</p>
    
    <nix-evaluator 
        height="200px"
        strict="true">
{ hello = "world"; }
    </nix-evaluator>

    <script src="../js/codemirror-bundle.js"></script>
    <script type="module" src="../js/nix-component.js"></script>
</body>
</html>
EOF

# Update paths in nix-component.js for the package structure
sed 's|./tvix_wasm.js|../wasm/tvix_wasm.js|g' www/nix-component.js > "$PACKAGE_DIR/js/nix-component.js"
sed 's|./codemirror-bundle.js|./codemirror-bundle.js|g' "$PACKAGE_DIR/js/nix-component.js" > "$PACKAGE_DIR/js/nix-component.js.tmp"
mv "$PACKAGE_DIR/js/nix-component.js.tmp" "$PACKAGE_DIR/js/nix-component.js"

# Create version info
cat > "$PACKAGE_DIR/VERSION" << EOF
Tvix Embeddable Nix Evaluator
Version: ${VERSION}
Build Date: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Commit: $(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
EOF

# Create package info
du -sh "$PACKAGE_DIR"/* > "$PACKAGE_DIR/PACKAGE_INFO"
echo "" >> "$PACKAGE_DIR/PACKAGE_INFO"
echo "Total package size: $(du -sh "$PACKAGE_DIR" | cut -f1)" >> "$PACKAGE_DIR/PACKAGE_INFO"

echo "Package created in: $PACKAGE_DIR/"
echo "Files included:"
find "$PACKAGE_DIR" -type f | sort
echo ""
echo "Package size: $(du -sh "$PACKAGE_DIR" | cut -f1)"
echo ""
echo "Ready for distribution! See $PACKAGE_DIR/README.md for usage instructions."