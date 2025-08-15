/**
 * Nix Notebook Cell Component
 * Individual cell that can handle expressions and variable assignments
 */

class NixNotebookCell extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.cellData = null;
        this.notebook = null;
        this.editor = null;
        this.debounceTimer = null;
        this.isEvaluating = false;
    }

    connectedCallback() {
        this.render();
        this.initEditor();
        this.setupEventHandlers();
    }

    render() {
        const cell = this.cellData || {};
        const index = parseInt(this.getAttribute('cell-index')) || 0;
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    --bg-primary: #2e3440;
                    --bg-secondary: #3b4252;
                    --bg-cell: #434c5e;
                    --border: #4c566a;
                    --border-active: #88c0d0;
                    --text-primary: #d8dee9;
                    --text-secondary: #81a1c1;
                    --accent: #88c0d0;
                    --success: #a3be8c;
                    --error: #bf616a;
                    --warning: #ebcb8b;
                }
                
                .cell {
                    background: var(--bg-cell);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    overflow: hidden;
                    transition: border-color 0.2s;
                }
                
                .cell:focus-within {
                    border-color: var(--border-active);
                }
                
                .cell.executing {
                    border-color: var(--accent);
                }
                
                .cell.error {
                    border-color: var(--error);
                }
                
                
                .output-controls {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 6px 12px;
                    background: var(--bg-secondary);
                    border-bottom: 1px solid var(--border);
                    font-size: 11px;
                    color: var(--text-secondary);
                    flex-wrap: wrap;
                    gap: 10px;
                }
                
                .cell-index {
                    font-weight: bold;
                    color: var(--accent);
                    min-width: 40px;
                }
                
                .cell-controls {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                
                .cell-controls label {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    cursor: pointer;
                }
                
                .cell-controls input[type="checkbox"] {
                    margin: 0;
                }
                
                .cell-btn {
                    background: var(--accent);
                    color: var(--bg-primary);
                    border: none;
                    padding: 4px 8px;
                    border-radius: 3px;
                    font-size: 10px;
                    cursor: pointer;
                    font-family: inherit;
                    transition: background-color 0.2s;
                }
                
                .cell-btn:hover {
                    background: var(--success);
                }
                
                .cell-btn:disabled {
                    background: var(--border);
                    cursor: not-allowed;
                }
                
                .cell-btn.danger {
                    background: var(--error);
                }
                
                .cell-btn.danger:hover {
                    background: #d04545;
                }
                
                .cell-btn.secondary {
                    background: var(--bg-primary);
                    color: var(--text-primary);
                    border: 1px solid var(--border);
                }
                
                .cell-btn.secondary:hover {
                    background: var(--border);
                }
                
                .cell-content {
                    display: flex;
                    flex-direction: row;
                    min-height: 120px;
                }
                
                .editor-section {
                    position: relative;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                
                .editor-section.hidden {
                    display: none;
                }
                
                .editor {
                    flex: 1;
                    min-height: 100px;
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                }
                
                .output-section {
                    border-left: 1px solid var(--border);
                    background: var(--bg-primary);
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                
                .output-section.full-width {
                    border-left: none;
                }
                
                .output-header {
                    padding: 6px 12px;
                    background: var(--bg-secondary);
                    font-size: 11px;
                    color: var(--text-secondary);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .variable-indicator {
                    color: var(--warning);
                    font-weight: bold;
                }
                
                .output {
                    padding: 12px;
                    white-space: pre-wrap;
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    font-size: 13px;
                    line-height: 1.4;
                    min-height: 60px;
                    max-height: 400px;
                    color: var(--text-primary);
                    overflow: auto;
                    flex: 1;
                }
                
                .output.success { 
                    color: var(--success); 
                }
                
                .output.error { 
                    color: var(--error); 
                }
                
                .output.info { 
                    color: var(--accent); 
                    font-style: italic; 
                }
                
                .output.empty {
                    color: var(--text-secondary);
                    font-style: italic;
                }
                
                .output.markdown {
                    color: var(--text-primary);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    line-height: 1.6;
                }
                
                .output.markdown h1, .output.markdown h2, .output.markdown h3 {
                    margin: 1em 0 0.5em 0;
                    color: var(--accent);
                }
                
                .output.markdown h1 { font-size: 1.5em; }
                .output.markdown h2 { font-size: 1.3em; }
                .output.markdown h3 { font-size: 1.1em; }
                
                .output.markdown strong {
                    font-weight: bold;
                    color: var(--text-primary);
                }
                
                .output.markdown em {
                    font-style: italic;
                    color: var(--text-secondary);
                }
                
                .output.markdown code {
                    background: var(--bg-secondary);
                    padding: 2px 4px;
                    border-radius: 3px;
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    font-size: 0.9em;
                    color: var(--warning);
                }
                
                .output.markdown pre {
                    background: var(--bg-secondary);
                    padding: 12px;
                    border-radius: 5px;
                    overflow-x: auto;
                    margin: 0.5em 0;
                }
                
                .output.markdown pre code {
                    background: none;
                    padding: 0;
                    color: var(--text-primary);
                }
                
                .output.markdown a {
                    color: var(--accent);
                    text-decoration: underline;
                }
                
                .output.markdown a:hover {
                    color: var(--success);
                }
                
                .cell-actions {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .button-group {
                    display: flex;
                    flex-direction: column;
                    gap: 1px;
                }
                
                .small-btn {
                    padding: 2px 4px;
                    font-size: 8px;
                    line-height: 1;
                    min-width: 18px;
                    height: 16px;
                }
                
                .toggle-btn {
                    padding: 2px 6px;
                    font-size: 10px;
                    line-height: 1;
                    font-family: monospace;
                    background: var(--bg-cell);
                    border: 1px solid var(--border);
                }
                
                .toggle-btn:hover {
                    background: var(--accent);
                }
                
                .execution-indicator {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: var(--accent);
                    color: var(--bg-primary);
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-size: 10px;
                    z-index: 100;
                    display: none;
                    animation: pulse 1.5s ease-in-out infinite;
                }
                
                .execution-indicator.active {
                    display: block;
                }
                
                .execution-indicator.completed {
                    background: var(--success);
                    animation: none;
                }
                
                .execution-indicator.error {
                    background: var(--error);
                    animation: none;
                }
                
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.05); }
                    100% { opacity: 1; transform: scale(1); }
                }
                
                .output-status-indicator {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 10px;
                    color: var(--text-secondary);
                }
                
                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--border);
                }
                
                .status-dot.evaluating {
                    background: var(--accent);
                    animation: pulse 1s ease-in-out infinite;
                }
                
                .status-dot.completed {
                    background: var(--success);
                    animation: none;
                }
                
                .status-dot.error {
                    background: var(--error);
                    animation: none;
                }
            </style>
            
            <div class="cell ${cell.error ? 'error' : ''}" id="cell-container">
                <div class="cell-content">
                    <div class="editor-section ${cell.showCode === false ? 'hidden' : ''}" id="editor-section">
                        <div class="editor" id="editor"></div>
                        <div class="execution-indicator" id="execution-indicator">Executing...</div>
                    </div>
                    
                    <div class="output-section ${cell.showCode === false ? 'full-width' : ''}" id="output-section">
                        <div class="output-controls">
                            <div class="cell-controls">
                                <button class="cell-btn toggle-btn" id="show-code-btn">
                                    ${cell.showCode !== false ? '<<' : '>>'}
                                </button>
                                <label>
                                    <input type="checkbox" id="text-mode" ${cell.isTextMode ? 'checked' : ''}>
                                    Text
                                </label>
                                <label id="live-mode-label">
                                    <input type="checkbox" id="live-mode" ${cell.liveMode !== false ? 'checked' : ''}>
                                    Live
                                </label>
                                <label id="inherit-mode-label" ${cell.isTextMode ? 'style="display: none;"' : ''}>
                                    <input type="checkbox" id="inherit-mode" ${cell.isInherit ? 'checked' : ''}>
                                    Inherit
                                </label>
                                <label id="raw-mode-label" ${cell.isTextMode ? 'style="display: none;"' : ''}>
                                    <input type="checkbox" id="raw-mode" ${cell.rawMode ? 'checked' : ''}>
                                    Raw
                                </label>
                                <button class="cell-btn ${cell.liveMode !== false ? 'hidden' : ''}" 
                                        id="evaluate-btn" style="display: ${cell.liveMode !== false ? 'none' : 'inline-block'}">
                                    ${cell.isTextMode ? 'Render' : 'Run'}
                                </button>
                            </div>
                            <div class="cell-actions">
                                <div class="output-status-indicator" id="output-status">
                                    <span class="status-dot" id="status-dot"></span>
                                    <span id="status-text">Ready</span>
                                </div>
                                <div class="button-group">
                                    <button class="cell-btn secondary small-btn" id="move-up-btn" 
                                            ${index === 0 ? 'disabled' : ''}>↑</button>
                                    <button class="cell-btn secondary small-btn" id="move-down-btn">↓</button>
                                </div>
                                <div class="button-group">
                                    <button class="cell-btn secondary small-btn" id="add-above-btn">+</button>
                                    <button class="cell-btn secondary small-btn" id="add-below-btn">+</button>
                                </div>
                                <button class="cell-btn danger small-btn" id="delete-btn">×</button>
                                <span class="variable-indicator ${cell.isVariable || cell.isInherit ? '' : 'hidden'}" 
                                      id="variable-indicator" style="display: ${cell.isVariable || cell.isInherit ? 'inline' : 'none'}">
                                    ${cell.isVariable ? `→ ${cell.variableName || ''}` : cell.isInherit ? '⇉ inherit' : ''}
                                </span>
                            </div>
                        </div>
                        <div class="output ${this.getOutputClass()}" id="output">
                            ${this.getOutputContent()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getOutputClass() {
        const cell = this.cellData || {};
        if (!cell.output && !cell.error) return 'empty';
        if (cell.error) return 'error';
        return 'success';
    }

    getOutputContent() {
        const cell = this.cellData || {};
        if (cell.error) return cell.error;
        if (cell.output) return cell.output;
        return 'Ready to evaluate...';
    }

    async initEditor() {
        // Wait for CodeMirror to be available
        if (!window.createTvixEditor) {
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
            this.cellData?.content || '',
            (update) => {
                this.cellData.content = this.editor.state.doc.toString();
                this.detectVariableAssignment();
                
                if (this.cellData.liveMode !== false) {
                    if (this.cellData.isTextMode) {
                        this.debouncedRender();
                    } else {
                        this.debouncedEvaluate();
                    }
                }
                
                if (this.notebook) {
                    this.notebook.markDirty();
                }
            },
            () => {
                if (this.cellData.liveMode === false) {
                    this.evaluateCell();
                }
            }
        );
        
        // Set initial content
        if (this.cellData?.content) {
            this.setEditorContent(this.cellData.content);
        }
    }

    detectVariableAssignment() {
        const content = this.cellData.content.trim();
        const assignmentMatch = content.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/s);
        
        if (assignmentMatch) {
            this.cellData.isVariable = true;
            this.cellData.variableName = assignmentMatch[1];
            this.updateVariableIndicator();
        } else {
            // If this cell was previously a variable assignment, remove it from global scope
            if (this.cellData.isVariable && this.cellData.variableName && this.notebook) {
                this.notebook.globalScope.delete(this.cellData.variableName);
            }
            this.cellData.isVariable = false;
            this.cellData.variableName = null;
            this.updateVariableIndicator();
        }
    }

    updateVariableIndicator() {
        const indicator = this.shadowRoot.getElementById('variable-indicator');
        if (indicator) {
            if (this.cellData.isVariable && this.cellData.variableName) {
                indicator.style.display = 'inline';
                indicator.textContent = `→ ${this.cellData.variableName}`;
            } else if (this.cellData.isInherit) {
                indicator.style.display = 'inline';
                indicator.textContent = '⇉ inherit';
            } else {
                indicator.style.display = 'none';
            }
        }
    }

    updateInheritIndicator() {
        this.updateVariableIndicator();
    }

    setupEventHandlers() {
        // Text mode toggle
        const textModeCheckbox = this.shadowRoot.getElementById('text-mode');
        textModeCheckbox?.addEventListener('change', (e) => {
            this.cellData.isTextMode = e.target.checked;
            this.toggleTextMode();
            
            if (this.notebook) {
                this.notebook.markDirty();
                // Re-evaluate if live mode is on
                if (this.cellData.liveMode !== false) {
                    this.evaluateCell();
                }
            }
        });

        // Live mode toggle
        const liveModeCheckbox = this.shadowRoot.getElementById('live-mode');
        liveModeCheckbox?.addEventListener('change', (e) => {
            this.cellData.liveMode = e.target.checked;
            const evaluateBtn = this.shadowRoot.getElementById('evaluate-btn');
            if (evaluateBtn && !this.cellData.isTextMode) {
                evaluateBtn.style.display = e.target.checked ? 'none' : 'inline-block';
            }
            
            if (this.notebook) {
                this.notebook.markDirty();
                // Re-evaluate if turning live mode ON
                if (e.target.checked) {
                    this.evaluateCell();
                }
            }
        });

        // Inherit mode toggle
        const inheritModeCheckbox = this.shadowRoot.getElementById('inherit-mode');
        inheritModeCheckbox?.addEventListener('change', (e) => {
            this.cellData.isInherit = e.target.checked;
            this.updateInheritIndicator();
            
            if (this.notebook) {
                this.notebook.markDirty();
                // Re-evaluate if live mode is on
                if (this.cellData.liveMode !== false) {
                    this.evaluateCell();
                }
            }
        });

        // Raw mode toggle
        const rawModeCheckbox = this.shadowRoot.getElementById('raw-mode');
        rawModeCheckbox?.addEventListener('change', (e) => {
            this.cellData.rawMode = e.target.checked;
            
            if (this.notebook) {
                this.notebook.markDirty();
                // Re-evaluate if live mode is on
                if (this.cellData.liveMode !== false) {
                    this.evaluateCell();
                }
            }
        });

        // Evaluate button
        this.shadowRoot.getElementById('evaluate-btn').addEventListener('click', () => {
            this.evaluateCell();
        });

        // Delete button
        this.shadowRoot.getElementById('delete-btn').addEventListener('click', () => {
            if (confirm('Delete this cell?')) {
                if (this.notebook) {
                    this.notebook.removeCell(this.cellData.id);
                }
            }
        });

        // Move buttons
        this.shadowRoot.getElementById('move-up-btn').addEventListener('click', () => {
            this.moveCell(-1);
        });

        this.shadowRoot.getElementById('move-down-btn').addEventListener('click', () => {
            this.moveCell(1);
        });

        // Add cell above/below buttons
        this.shadowRoot.getElementById('add-above-btn').addEventListener('click', () => {
            this.addCellRelative(-1);
        });

        this.shadowRoot.getElementById('add-below-btn').addEventListener('click', () => {
            this.addCellRelative(1);
        });

        // Show Code toggle button
        this.shadowRoot.getElementById('show-code-btn').addEventListener('click', () => {
            this.cellData.showCode = !this.cellData.showCode;
            this.toggleCodeVisibility();
            this.updateToggleButton();
            
            if (this.notebook) {
                this.notebook.markDirty();
            }
        });
    }

    moveCell(direction) {
        if (!this.notebook) return;
        
        const currentIndex = this.notebook.cells.findIndex(c => c.id === this.cellData.id);
        const newIndex = currentIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.notebook.cells.length) {
            // Swap cells
            [this.notebook.cells[currentIndex], this.notebook.cells[newIndex]] = 
            [this.notebook.cells[newIndex], this.notebook.cells[currentIndex]];
            
            this.notebook.renderCells();
            this.notebook.markDirty();
        }
    }

    addCellRelative(direction) {
        if (!this.notebook) return;
        
        const currentIndex = this.notebook.cells.findIndex(c => c.id === this.cellData.id);
        const insertIndex = direction === -1 ? currentIndex : currentIndex + 1;
        
        this.notebook.addCell('', insertIndex);
    }

    toggleCodeVisibility() {
        const editorSection = this.shadowRoot.getElementById('editor-section');
        const outputSection = this.shadowRoot.getElementById('output-section');
        
        if (this.cellData.showCode) {
            // Show the editor
            editorSection.classList.remove('hidden');
            outputSection.classList.remove('full-width');
        } else {
            // Hide the editor
            editorSection.classList.add('hidden');
            outputSection.classList.add('full-width');
        }
    }

    updateToggleButton() {
        const toggleBtn = this.shadowRoot.getElementById('show-code-btn');
        if (toggleBtn) {
            toggleBtn.textContent = this.cellData.showCode ? '<<' : '>>';
        }
    }

    updateStatusIndicator(status, text) {
        const statusDot = this.shadowRoot.getElementById('status-dot');
        const statusText = this.shadowRoot.getElementById('status-text');
        const executionIndicator = this.shadowRoot.getElementById('execution-indicator');
        
        if (statusDot) {
            statusDot.className = 'status-dot';
            if (status) statusDot.classList.add(status);
        }
        
        if (statusText) {
            statusText.textContent = text || 'Ready';
        }
        
        if (executionIndicator) {
            executionIndicator.className = 'execution-indicator';
            if (status === 'evaluating') {
                executionIndicator.classList.add('active');
                executionIndicator.textContent = 'Evaluating...';
            } else if (status === 'completed') {
                // Show completed briefly, then hide
                executionIndicator.classList.add('completed');
                executionIndicator.textContent = 'Done';
                setTimeout(() => {
                    executionIndicator.classList.remove('active', 'completed');
                }, 1000);
            } else if (status === 'error') {
                executionIndicator.classList.add('error');
                executionIndicator.textContent = 'Error';
                setTimeout(() => {
                    executionIndicator.classList.remove('active', 'error');
                }, 2000);
            } else {
                executionIndicator.classList.remove('active', 'completed', 'error');
            }
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
        }
    }

    debouncedEvaluate() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        
        if (this.isEvaluating) {
            this.debounceTimer = setTimeout(() => this.debouncedEvaluate(), 500);
            return;
        }
        
        this.debounceTimer = setTimeout(() => {
            this.debounceTimer = null;
            this.evaluateCell();
        }, 500);
    }

    debouncedRender() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        
        this.debounceTimer = setTimeout(() => {
            this.debounceTimer = null;
            this.renderMarkdown();
        }, 500);
    }

    toggleTextMode() {
        const evaluateBtn = this.shadowRoot.getElementById('evaluate-btn');
        const inheritLabel = this.shadowRoot.getElementById('inherit-mode-label');
        const rawLabel = this.shadowRoot.getElementById('raw-mode-label');
        
        if (this.cellData.isTextMode) {
            // Switch to text mode
            if (evaluateBtn) {
                evaluateBtn.textContent = 'Render';
                evaluateBtn.style.display = this.cellData.liveMode ? 'none' : 'inline-block';
            }
            if (inheritLabel) inheritLabel.style.display = 'none';
            if (rawLabel) rawLabel.style.display = 'none';
            
            // Render markdown immediately when switching to text mode
            this.renderMarkdown();
        } else {
            // Switch to code mode
            if (evaluateBtn) {
                evaluateBtn.textContent = 'Run';
                evaluateBtn.style.display = this.cellData.liveMode ? 'none' : 'inline-block';
            }
            if (inheritLabel) inheritLabel.style.display = '';
            if (rawLabel) rawLabel.style.display = '';
            
            // Clear output when switching back to code mode
            this.updateOutput('Ready to evaluate...', null, 'empty');
        }
    }

    renderMarkdown() {
        const content = this.cellData.content.trim();
        if (!content) {
            this.updateOutput('', null, 'empty');
            this.updateStatusIndicator(null, 'Empty');
            return;
        }
        
        this.updateStatusIndicator('evaluating', 'Rendering');

        // Simple markdown renderer
        let html = content
            // Headers
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            
            // Bold and italic
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            
            // Code blocks
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            
            // Links
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
            
            // Line breaks
            .replace(/\n/g, '<br>');

        this.updateOutput(html, null, 'markdown');
        this.updateStatusIndicator('completed', 'Rendered');
    }

    async evaluateCell(forceEvaluation = false) {
        if (this.cellData.isTextMode) {
            this.renderMarkdown();
            return;
        }
        
        if (!this.notebook?.evaluator || (!forceEvaluation && this.isEvaluating)) {
            return;
        }
        
        const content = this.cellData.content.trim();
        if (!content) {
            this.updateOutput('', null);
            this.updateStatusIndicator(null, 'Empty');
            return;
        }
        
        this.isEvaluating = true;
        
        // Update status indicators BEFORE starting evaluation
        this.updateStatusIndicator('evaluating', 'Evaluating');
        this.shadowRoot.getElementById('cell-container').classList.add('executing');
        this.updateOutput('Evaluating...', null, 'info');
        
        // Use setTimeout to allow UI to update before heavy computation
        setTimeout(async () => {
            await this.performEvaluation(content);
        }, 10);
    }

    async performEvaluation(content) {
        try {
            // Build the evaluation context with global scope
            let evaluationExpression;
            
            if (this.cellData.isVariable) {
                // For variable assignments, we need to evaluate the RHS and store the result
                const match = content.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/s);
                if (match) {
                    const varName = match[1];
                    const expression = match[2];
                    
                    // Build context with existing global variables
                    const context = this.notebook.buildGlobalContext();
                    evaluationExpression = `let\n${context}in ${expression}`;
                    
                    // Evaluate and store the result
                    const result = await this.evaluateExpression(evaluationExpression);
                    
                    // Store in global scope (store the actual expression, not the result string)
                    this.notebook.globalScope.set(varName, expression);
                    
                    // Update output to show just the result
                    this.updateOutput(result, null);
                    this.updateStatusIndicator('completed', 'Assigned');
                } else {
                    this.updateOutput('', 'Invalid variable assignment syntax');
                    this.updateStatusIndicator('error', 'Invalid syntax');
                }
            } else {
                // For regular expressions, evaluate with global context
                const context = this.notebook.buildGlobalContext();
                evaluationExpression = context ? 
                    `let\n${context}in ${content}` : 
                    content;
                
                const result = await this.evaluateExpression(evaluationExpression);
                
                // If this is an inherit cell, try to parse the result as an attrset
                if (this.cellData.isInherit) {
                    await this.handleInheritResult(result, evaluationExpression);
                    this.updateStatusIndicator('completed', 'Inherited');
                } else {
                    this.updateOutput(result, null);
                    this.updateStatusIndicator('completed', 'Done');
                }
            }
            
        } catch (error) {
            this.updateOutput('', error.toString());
            this.updateStatusIndicator('error', 'Error');
        } finally {
            this.isEvaluating = false;
            this.shadowRoot.getElementById('cell-container').classList.remove('executing');
            
            if (this.notebook) {
                this.notebook.updateStatus();
                this.notebook.markDirty();
            }
        }
    }

    async evaluateExpression(expression) {
        const evaluator = this.notebook.evaluator;
        const settings = this.notebook.globalSettings;
        const rawMode = this.cellData.rawMode || false;
        
        if (typeof evaluator.evaluate_with_settings === 'function') {
            return evaluator.evaluate_with_settings(
                expression,
                rawMode,
                settings.prettyPrintAst,
                settings.displayAst,
                settings.dumpBytecode,
                settings.traceRuntime,
                settings.strict,
                settings.nixCompat
            );
        } else {
            return evaluator.evaluate(expression, rawMode);
        }
    }

    async handleInheritResult(result, expression) {
        try {
            // First check if this looks like an attrset by evaluating a test expression
            const testExpression = `builtins.isAttrs (${expression})`;
            const context = this.notebook.buildGlobalContext();
            const fullTestExpression = context ? 
                `let\n${context}in ${testExpression}` : 
                testExpression;
            
            const isAttrs = await this.evaluateExpression(fullTestExpression);
            
            if (isAttrs.includes('true')) {
                // Get the attribute names by evaluating builtins.attrNames
                const namesExpression = `builtins.attrNames (${expression})`;
                const fullNamesExpression = context ? 
                    `let\n${context}in ${namesExpression}` : 
                    namesExpression;
                
                const attrNamesResult = await this.evaluateExpression(fullNamesExpression);
                
                // Parse the attribute names (they come as a list like ["attr1" "attr2"])
                const attrNames = this.parseNixList(attrNamesResult);
                
                if (attrNames.length > 0) {
                    // Add each attribute to global scope
                    let inheritedCount = 0;
                    const inheritedNames = [];
                    
                    for (const attrName of attrNames) {
                        // Evaluate each attribute and add to global scope
                        const attrExpression = `(${expression}).${attrName}`;
                        const fullAttrExpression = context ? 
                            `let\n${context}in ${attrExpression}` : 
                            attrExpression;
                        
                        try {
                            // Store the attribute expression in global scope
                            this.notebook.globalScope.set(attrName, attrExpression);
                            inheritedNames.push(attrName);
                            inheritedCount++;
                        } catch (attrError) {
                            console.warn(`Failed to inherit attribute ${attrName}:`, attrError);
                        }
                    }
                    
                    this.updateOutput(
                        `${result}\n\n✓ Inherited ${inheritedCount} attributes: ${inheritedNames.join(', ')}`, 
                        null
                    );
                } else {
                    this.updateOutput(`${result}\n\n⚠ Empty attrset - nothing to inherit`, null);
                }
            } else {
                this.updateOutput(`${result}\n\n⚠ Result is not an attrset - cannot inherit`, null);
            }
        } catch (error) {
            this.updateOutput(`${result}\n\n⚠ Failed to process inherit: ${error.message}`, null);
        }
    }

    parseNixList(listString) {
        // Parse a Nix list string like '[ "attr1" "attr2" "attr3" ]' into an array
        const match = listString.match(/\[\s*(.*?)\s*\]/);
        if (!match) return [];
        
        const content = match[1];
        if (!content.trim()) return [];
        
        // Extract quoted strings
        const names = [];
        const regex = /"([^"]+)"/g;
        let match2;
        while ((match2 = regex.exec(content)) !== null) {
            names.push(match2[1]);
        }
        
        return names;
    }

    updateOutput(output, error, type = null) {
        this.cellData.output = output;
        this.cellData.error = error;
        
        const outputEl = this.shadowRoot.getElementById('output');
        if (outputEl) {
            // For markdown rendering, use innerHTML; for other content, use textContent
            if (type === 'markdown') {
                outputEl.innerHTML = output || 'Ready to render...';
            } else {
                outputEl.textContent = error || output || 'Ready to evaluate...';
            }
            
            outputEl.className = 'output';
            
            if (error) {
                outputEl.classList.add('error');
                this.shadowRoot.getElementById('cell-container').classList.add('error');
            } else {
                outputEl.classList.add(type || (output ? 'success' : 'empty'));
                this.shadowRoot.getElementById('cell-container').classList.remove('error');
            }
        }
    }
}

// Register the custom element
customElements.define('nix-notebook-cell', NixNotebookCell);

// Export for direct usage
export { NixNotebookCell };