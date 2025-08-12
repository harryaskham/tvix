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
