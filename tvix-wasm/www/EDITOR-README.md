# CodeMirror 6 Vim Editor Bundle

This directory contains a bundled CodeMirror 6 editor with vim mode for the Tvix WebAssembly evaluator.

## Files

- `codemirror-bundle.js` - The bundled editor (1.5MB, ready to use)
- `editor.mjs` - Source file with editor configuration  
- `package.json` - Dependencies for bundling
- `rollup.config.mjs` - Rollup bundler configuration

## Features

✅ **Full vim mode** with modal editing  
✅ **Custom mappings**: `jk`/`kj` → `Esc`, `;` → `:`  
✅ **Nord color scheme** matching the UI  
✅ **JavaScript syntax highlighting** (closest to Nix)  
✅ **Live evaluation** integration  
✅ **Line numbers** and active line highlighting  

## Rebuilding the Bundle

If you need to modify the editor configuration:

1. Edit `editor.mjs` with your changes
2. Run: `npm run bundle`
3. The updated `codemirror-bundle.js` will be generated

## Usage in HTML

```html
<script src="codemirror-bundle.js"></script>
<script>
  const editor = window.createTvixEditor(
    document.getElementById('editor-container'),
    'initial content',
    function(update) { /* onChange callback */ }
  );
</script>
```

## Dependencies

- CodeMirror 6 core
- @replit/codemirror-vim (vim mode)
- @codemirror/lang-javascript (syntax highlighting)
- Rollup (bundler)