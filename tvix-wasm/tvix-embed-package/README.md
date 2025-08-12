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
