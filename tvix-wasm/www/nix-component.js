/**
 * Embeddable Nix Evaluator Web Component
 * Usage: <nix expression="..." strict="true" save-changes="false">Optional initial expression</nix>
 */

import wasmInit, { TvixEvaluator } from './tvix_wasm.js';

class NixComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.editor = null;
        this.evaluator = null;
        this.debounceTimer = null;
        this.isEvaluating = false;
        this.evaluationAborted = false;
        
        // Component state
        this.settings = {
            liveMode: true,
            rawMode: false,
            strict: false,
            nixCompat: false,
            prettyPrintAst: false,
            displayAst: false,
            dumpBytecode: false,
            traceRuntime: false,
            saveChanges: true,
            showControls: true,
            readOnly: false,
            height: '400px'
        };
    }

    static get observedAttributes() {
        return [
            'expression',
            'live-mode',
            'raw-mode', 
            'strict',
            'nix-compat',
            'pretty-print-ast',
            'display-ast',
            'dump-bytecode',
            'trace-runtime',
            'save-changes',
            'show-controls',
            'read-only',
            'height',
            'theme'
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        const boolAttrs = [
            'live-mode', 'raw-mode', 'strict', 'nix-compat',
            'pretty-print-ast', 'display-ast', 'dump-bytecode', 
            'trace-runtime', 'save-changes', 'show-controls', 'read-only'
        ];
        
        if (boolAttrs.includes(name)) {
            this.settings[name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = 
                newValue !== null && newValue !== 'false';
        } else if (name === 'height') {
            this.settings.height = newValue || '400px';
        } else if (name === 'expression') {
            if (this.editor && this.isConnected) {
                this.setEditorContent(newValue || '');
            }
        }
        
        if (this.isConnected) {
            this.updateDisplay();
            // Re-render if show-controls changed to update the template
            if (name === 'show-controls') {
                this.render();
                if (this.editor) {
                    // Reinitialize editor in the new DOM structure
                    this.initEditor();
                }
            }
        }
    }

    async connectedCallback() {
        // Initialize WASM if not already done
        if (!window.nixComponentWasm) {
            try {
                console.log('Initializing WASM for Nix components...');
                window.nixComponentWasm = await wasmInit();
                window.nixComponentEvaluator = new TvixEvaluator();
                console.log('WASM initialized successfully');
            } catch (error) {
                console.error('Failed to initialize WASM:', error);
                window.nixComponentEvaluator = new MockTvixEvaluator();
            }
        }
        
        this.evaluator = window.nixComponentEvaluator;
        
        // Parse attributes
        this.parseAttributes();
        
        // Create the component UI
        this.render();
        
        // Initialize editor
        await this.initEditor();
        
        // Set initial content
        const expression = this.getAttribute('expression') || this.textContent?.trim() || '';
        if (expression) {
            this.setEditorContent(expression);
            // Evaluate initially if we have content
            if (this.settings.liveMode) {
                setTimeout(() => this.evaluateCurrentExpression(), 100);
            }
        }
        
        this.updateDisplay();
    }

    parseAttributes() {
        // Parse boolean attributes
        const boolAttrs = [
            'live-mode', 'raw-mode', 'strict', 'nix-compat',
            'pretty-print-ast', 'display-ast', 'dump-bytecode', 
            'trace-runtime', 'save-changes', 'show-controls', 'read-only'
        ];
        
        boolAttrs.forEach(attr => {
            const value = this.getAttribute(attr);
            if (value !== null) {
                this.settings[attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = 
                    value !== 'false';
            }
        });

        // Parse other attributes
        const height = this.getAttribute('height');
        if (height) this.settings.height = height;
    }

    render() {
        const theme = this.getAttribute('theme') || 'nord';
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    --bg-primary: #2e3440;
                    --bg-secondary: #3b4252;
                    --border: #4c566a;
                    --text-primary: #d8dee9;
                    --text-secondary: #81a1c1;
                    --accent: #88c0d0;
                    --success: #a3be8c;
                    --error: #bf616a;
                    --warning: #ebcb8b;
                }
                
                .container {
                    display: flex;
                    flex-direction: column;
                    height: ${this.settings.height};
                    background: var(--bg-secondary);
                    border: 1px solid var(--border);
                    border-radius: 6px;
                    overflow: hidden;
                }
                
                .controls {
                    display: ${this.settings.showControls ? 'flex' : 'none'};
                    align-items: center;
                    gap: 15px;
                    padding: 8px 15px;
                    background: var(--bg-primary);
                    border-bottom: 1px solid var(--border);
                    font-size: 12px;
                }
                
                .controls label {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    color: var(--text-primary);
                    cursor: pointer;
                }
                
                .controls input[type="checkbox"] {
                    margin: 0;
                }
                
                .evaluate-btn {
                    background: var(--accent);
                    color: var(--bg-primary);
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                
                .evaluate-btn:hover {
                    background: var(--success);
                }
                
                .evaluate-btn:disabled {
                    background: var(--border);
                    cursor: not-allowed;
                }
                
                .evaluate-btn.hidden {
                    display: none;
                }
                
                .main {
                    display: flex;
                    flex: 1;
                    min-height: 0;
                }
                
                .editor-section {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                }
                
                .editor {
                    flex: 1;
                    min-height: 0;
                }
                
                .output-section {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    border-left: 1px solid var(--border);
                    min-width: 0;
                }
                
                .output-header {
                    padding: 8px 15px;
                    background: var(--bg-primary);
                    border-bottom: 1px solid var(--border);
                    font-size: 12px;
                    font-weight: 500;
                    color: var(--text-secondary);
                }
                
                .output {
                    flex: 1;
                    padding: 15px;
                    white-space: pre-wrap;
                    overflow-y: auto;
                    font-size: 13px;
                    line-height: 1.4;
                    color: var(--text-primary);
                    background: var(--bg-primary);
                }
                
                .output.success { color: var(--success); }
                .output.error { color: var(--error); }
                .output.info { color: var(--accent); font-style: italic; }
                
                .controls-hidden .controls {
                    display: none;
                }
                
                .controls-hidden .output-section {
                    display: flex;
                }
            </style>
            
            <div class="container ${this.settings.showControls ? '' : 'controls-hidden'}">
                <div class="controls">
                    <label>
                        <input type="checkbox" id="live-mode" ${this.settings.liveMode ? 'checked' : ''}>
                        Live
                    </label>
                    <label>
                        <input type="checkbox" id="raw-mode" ${this.settings.rawMode ? 'checked' : ''}>
                        Raw
                    </label>
                    <label>
                        <input type="checkbox" id="strict" ${this.settings.strict ? 'checked' : ''}>
                        Strict
                    </label>
                    <label>
                        <input type="checkbox" id="nix-compat" ${this.settings.nixCompat ? 'checked' : ''}>
                        Nix Compat
                    </label>
                    <button id="evaluate-btn" class="evaluate-btn ${this.settings.liveMode ? 'hidden' : ''}">
                        Evaluate
                    </button>
                </div>
                
                <div class="main">
                    <div class="editor-section">
                        <div class="editor" id="editor"></div>
                    </div>
                    <div class="output-section">
                        <div class="output-header">Result</div>
                        <div class="output" id="output">Ready to evaluate...</div>
                    </div>
                </div>
            </div>
        `;
    }

    async initEditor() {
        // Wait for CodeMirror to be available
        if (!window.createTvixEditor) {
            // Try to load CodeMirror bundle if not available
            const script = document.createElement('script');
            script.src = './codemirror-bundle.js';
            document.head.appendChild(script);
            
            await new Promise((resolve) => {
                script.onload = resolve;
            });
        }

        const editorEl = this.shadowRoot.getElementById('editor');
        this.editor = window.createTvixEditor(
            editorEl,
            null, // Initial content will be set later
            (update) => {
                // Prevent changes in read-only mode
                if (this.settings.readOnly) {
                    return;
                }
                
                if (this.settings.liveMode) {
                    this.debouncedEvaluate();
                }
                
                if (this.settings.saveChanges) {
                    this.dispatchEvent(new CustomEvent('change', {
                        detail: { content: this.editor.state.doc.toString() }
                    }));
                }
            },
            () => {
                if (!this.settings.liveMode && !this.settings.readOnly) {
                    this.evaluateCurrentExpression();
                }
            }
        );

        // Configure read-only mode
        this.updateReadOnlyMode();

        // Set up control event listeners
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        const controls = ['live-mode', 'raw-mode', 'strict', 'nix-compat'];
        controls.forEach(control => {
            const element = this.shadowRoot.getElementById(control);
            if (element) {
                element.addEventListener('change', (e) => {
                    const setting = control.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    this.settings[setting] = e.target.checked;
                    
                    // Update evaluate button visibility
                    this.updateEvaluateButton();
                    
                    // Trigger evaluation for these controls
                    if (control === 'live-mode' && e.target.checked) {
                        this.evaluateCurrentExpression();
                    } else if (control === 'strict' || control === 'nix-compat' || control === 'raw-mode') {
                        this.evaluateCurrentExpression();
                    }
                    
                    this.dispatchEvent(new CustomEvent('setting-change', {
                        detail: { setting: control, value: e.target.checked }
                    }));
                });
            }
        });

        // Add evaluate button handler
        const evaluateBtn = this.shadowRoot.getElementById('evaluate-btn');
        if (evaluateBtn) {
            evaluateBtn.addEventListener('click', () => {
                this.evaluateCurrentExpression();
            });
        }
    }

    setEditorContent(content) {
        if (this.editor) {
            const transaction = this.editor.state.update({
                changes: {
                    from: 0,
                    to: this.editor.state.doc.length,
                    insert: content
                }
            });
            this.editor.dispatch(transaction);
            
            if (this.settings.liveMode) {
                this.debouncedEvaluate();
            }
        }
    }

    getEditorContent() {
        return this.editor ? this.editor.state.doc.toString() : '';
    }

    debouncedEvaluate() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        
        if (this.isEvaluating) {
            this.evaluationAborted = true;
            this.debounceTimer = setTimeout(() => this.debouncedEvaluate(), 500);
            return;
        }
        
        this.debounceTimer = setTimeout(() => {
            this.debounceTimer = null;
            this.evaluationAborted = false;
            this.evaluateCurrentExpression();
        }, 500);
    }

    async evaluateCurrentExpression() {
        if (!this.editor || !this.evaluator) return;
        
        if (this.isEvaluating) {
            console.log('Evaluation already in progress, skipping...');
            return;
        }
        
        const input = this.editor.state.doc.toString().trim();
        const output = this.shadowRoot.getElementById('output');
        
        if (!input) {
            output.textContent = 'Ready to evaluate...';
            output.className = 'output';
            return;
        }
        
        this.isEvaluating = true;
        this.evaluationAborted = false;
        output.textContent = 'Evaluating...';
        output.className = 'output info';
        
        setTimeout(async () => {
            if (this.evaluationAborted) {
                this.isEvaluating = false;
                return;
            }
            
            try {
                let result;
                
                if (typeof this.evaluator.evaluate_with_settings === 'function') {
                    result = this.evaluator.evaluate_with_settings(
                        input,
                        this.settings.rawMode,
                        this.settings.prettyPrintAst,
                        this.settings.displayAst,
                        this.settings.dumpBytecode,
                        this.settings.traceRuntime,
                        this.settings.strict,
                        this.settings.nixCompat
                    );
                } else {
                    result = this.evaluator.evaluate(input, this.settings.rawMode);
                }
                
                if (!this.evaluationAborted) {
                    output.textContent = this.maybeUnquote(result, this.settings.rawMode);
                    output.className = 'output success';
                    
                    this.dispatchEvent(new CustomEvent('evaluation', {
                        detail: { input, result, success: true }
                    }));
                }
            } catch (error) {
                if (!this.evaluationAborted) {
                    console.error('Evaluation error:', error);
                    const errorMsg = error.toString() || String(error);
                    output.textContent = errorMsg;
                    output.className = 'output error';
                    
                    this.dispatchEvent(new CustomEvent('evaluation', {
                        detail: { input, error: errorMsg, success: false }
                    }));
                }
            } finally {
                this.isEvaluating = false;
            }
        }, 10);
    }

    maybeUnquote(s, rawMode) {
        if ('"' === s[0] && '"' === s[s.length - 1]) {
            const unquoted = s.substring(1, s.length - 1);
            return rawMode ? this.unescapeWhitespace(unquoted) : unquoted;
        } else {
            return rawMode ? this.unescapeWhitespace(s) : s;
        }
    }

    unescapeWhitespace(s) {
        return s.replace(/\\n/g, '\n')
                .replace(/\\t/g, '\t')
                .replace(/\\r/g, '\r')
                .replace(/\\\\/g, '\\');
    }

    updateDisplay() {
        const container = this.shadowRoot.querySelector('.container');
        if (this.settings.showControls) {
            container.classList.remove('controls-hidden');
        } else {
            container.classList.add('controls-hidden');
        }
        
        container.style.height = this.settings.height;
        this.updateEvaluateButton();
        this.updateReadOnlyMode();
    }

    updateEvaluateButton() {
        const evaluateBtn = this.shadowRoot.getElementById('evaluate-btn');
        if (evaluateBtn) {
            if (this.settings.liveMode) {
                evaluateBtn.classList.add('hidden');
            } else {
                evaluateBtn.classList.remove('hidden');
            }
            evaluateBtn.disabled = this.settings.readOnly;
        }
    }

    updateReadOnlyMode() {
        if (!this.editor) return;
        
        const editorEl = this.shadowRoot.getElementById('editor');
        
        if (this.settings.readOnly) {
            // Multiple approaches to ensure read-only mode works
            
            // 1. Block all document changes at the transaction level
            if (!this.readOnlyTransactionFilter) {
                this.readOnlyTransactionFilter = this.editor.state.transactionFilter.of((tr) => {
                    // Block all document changes
                    if (tr.docChanged) {
                        return []; // Return empty array to cancel the transaction
                    }
                    return tr;
                });
                
                this.editor.dispatch({
                    effects: this.editor.state.reconfigureExtensions.of([this.readOnlyTransactionFilter])
                });
            }
            
            // 2. DOM-level blocking
            const cmEditor = editorEl.querySelector('.cm-editor');
            if (cmEditor) {
                cmEditor.style.pointerEvents = 'none';
                cmEditor.setAttribute('aria-readonly', 'true');
            }
            
            // 3. Visual feedback
            editorEl.style.opacity = '0.8';
            
            // 4. Complete overlay for absolute security
            if (!this.readOnlyOverlay) {
                this.readOnlyOverlay = document.createElement('div');
                this.readOnlyOverlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1000;
                    cursor: not-allowed;
                    background: rgba(0,0,0,0.01);
                    user-select: none;
                    pointer-events: all;
                `;
                editorEl.style.position = 'relative';
                editorEl.appendChild(this.readOnlyOverlay);
            }
        } else {
            // Enable editing
            editorEl.style.opacity = '1';
            
            // Remove DOM restrictions
            const cmEditor = editorEl.querySelector('.cm-editor');
            if (cmEditor) {
                cmEditor.style.pointerEvents = 'auto';
                cmEditor.removeAttribute('aria-readonly');
            }
            
            // Remove overlay
            if (this.readOnlyOverlay) {
                this.readOnlyOverlay.remove();
                this.readOnlyOverlay = null;
            }
            
            // Remove transaction filter by reconfiguring without it
            if (this.readOnlyTransactionFilter) {
                this.editor.dispatch({
                    effects: this.editor.state.reconfigureExtensions.of([])
                });
                this.readOnlyTransactionFilter = null;
            }
        }
    }

    // Public API methods
    evaluate() {
        this.evaluateCurrentExpression();
    }

    setExpression(expr) {
        this.setEditorContent(expr);
    }

    getExpression() {
        return this.getEditorContent();
    }

    updateSettings(newSettings) {
        Object.assign(this.settings, newSettings);
        this.updateDisplay();
    }
}

// Mock evaluator for fallback
class MockTvixEvaluator {
    constructor() {
        console.log("Mock Tvix evaluator initialized for component");
    }
    
    evaluate(expression, raw) {
        if (expression.trim() === '1 + 2') {
            return '3 :: int';
        } else if (expression.includes('hello')) {
            return '"Hello from Tvix component!" :: string';
        } else {
            return `Mock result: ${expression}`;
        }
    }
    
    evaluate_with_settings(expression, raw, prettyPrintAst, displayAst, dumpBytecode, traceRuntime, strict, nixCompat) {
        return this.evaluate(expression, raw);
    }
}

// Register the custom element
customElements.define('nix-evaluator', NixComponent);

// Export for direct usage
export { NixComponent };