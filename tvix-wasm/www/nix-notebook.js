/**
 * Nix Notebook - Colab-like interface for Nix expressions
 * Supports global variable scope sharing between cells
 */

import wasmInit, { TvixEvaluator } from './tvix_wasm.js';

class NixNotebook extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Notebook state
        this.title = 'Untitled Notebook';
        this.cells = [];
        this.cellIdCounter = 0;
        this.globalScope = new Map(); // Stores variables shared between cells
        this.evaluator = null;
        this.isEvaluating = false;
        this.currentFilePath = null; // Track current file for saving
        this.currentFileHandle = null; // File handle for File System Access API
        this.isDirty = false; // Track unsaved changes
        this.lastSaveTime = null; // Track when file was last saved
        this.saveStatusInterval = null; // Interval for updating save status
        
        // Global settings
        this.globalSettings = {
            strict: false,
            nixCompat: false,
            rawMode: false,
            prettyPrintAst: false,
            displayAst: false,
            dumpBytecode: false,
            traceRuntime: false,
            autosave: false,
            showInspector: false
        };
    }

    async connectedCallback() {
        // Initialize WASM if not already done
        if (!window.nixNotebookWasm) {
            try {
                console.log('Initializing WASM for Nix Notebook...');
                window.nixNotebookWasm = await wasmInit();
                window.nixNotebookEvaluator = new TvixEvaluator();
                console.log('WASM initialized successfully');
            } catch (error) {
                console.error('Failed to initialize WASM:', error);
                window.nixNotebookEvaluator = new MockTvixEvaluator();
            }
        }
        
        this.evaluator = window.nixNotebookEvaluator;
        
        // Create the notebook UI
        this.render();
        
        // Check for file path in URL and load it
        await this.handleUrlParams();
        
        // Add initial cell if empty
        if (this.cells.length === 0) {
            this.addCell();
        }
        
        this.setupEventHandlers();
        this.startSaveStatusUpdater();
    }

    async handleUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const filePath = urlParams.get('file');
        
        if (filePath) {
            try {
                // Try to load the file
                const response = await fetch(filePath);
                if (response.ok) {
                    const content = await response.text();
                    const data = JSON.parse(content);
                    
                    this.title = data.title || 'Loaded Notebook';
                    this.globalSettings = { ...this.globalSettings, ...data.globalSettings };
                    this.cellIdCounter = 0;
                    this.cells = (data.cells || []).map((cell, index) => ({
                        id: `cell-${++this.cellIdCounter}`,
                        content: cell.content || '',
                        output: '',
                        error: null,
                        liveMode: cell.liveMode !== false,
                        isVariable: false,
                        variableName: null,
                        isTextMode: cell.isTextMode || false,
                        showCode: cell.showCode !== undefined ? cell.showCode : !(cell.isTextMode || false)
                    }));
                    
                    this.currentFilePath = filePath.split('/').pop();
                    this.isDirty = false;
                    this.lastSaveTime = new Date();
                    this.globalScope.clear();
                    
                    console.log(`Loaded notebook from URL: ${filePath}`);
                }
            } catch (error) {
                console.warn(`Failed to load file from URL: ${filePath}`, error);
            }
        }
    }

    updateUrl() {
        if (this.currentFilePath) {
            const url = new URL(window.location);
            url.searchParams.set('file', `www/${this.currentFilePath}`);
            window.history.replaceState({}, '', url);
        } else {
            const url = new URL(window.location);
            url.searchParams.delete('file');
            window.history.replaceState({}, '', url);
        }
    }

    getSaveStatusText() {
        if (!this.currentFilePath) {
            return 'Unsaved notebook';
        }
        
        if (this.isDirty) {
            return `${this.currentFilePath} • Unsaved changes`;
        }
        
        if (this.lastSaveTime) {
            const elapsed = Date.now() - this.lastSaveTime.getTime();
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            if (minutes > 0) {
                return `${this.currentFilePath} • Saved ${minutes}m ago`;
            } else if (seconds > 5) {
                return `${this.currentFilePath} • Saved ${seconds}s ago`;
            } else {
                return `${this.currentFilePath} • Just saved`;
            }
        }
        
        return `${this.currentFilePath} • Saved`;
    }

    updateSaveStatus() {
        const statusEl = this.shadowRoot.getElementById('save-status');
        if (statusEl) {
            statusEl.innerHTML = this.getSaveStatusText();
            statusEl.className = 'save-status';
            if (this.isDirty) {
                statusEl.classList.add('dirty');
            } else if (this.lastSaveTime) {
                statusEl.classList.add('saved');
            }
        }
    }

    startSaveStatusUpdater() {
        // Update save status every 5 seconds
        this.saveStatusInterval = setInterval(() => {
            this.updateSaveStatus();
        }, 5000);
    }

    getInspectorContent() {
        if (this.globalScope.size === 0) {
            return '<div style="color: var(--text-secondary); font-style: italic; text-align: center; padding: 20px;">No variables in scope</div>';
        }

        let content = '';
        for (const [name, expression] of this.globalScope) {
            content += `
                <div class="variable-item">
                    <div class="variable-name">${name}</div>
                    <div class="variable-value">${this.truncateValue(expression)}</div>
                    <div class="variable-type">Expression</div>
                </div>
            `;
        }
        return content;
    }

    truncateValue(value) {
        if (value.length > 200) {
            return value.substring(0, 200) + '...';
        }
        return value;
    }

    updateInspector() {
        const inspectorContent = this.shadowRoot.getElementById('inspector-content');
        if (inspectorContent) {
            inspectorContent.innerHTML = this.getInspectorContent();
        }
    }

    toggleInspector(show) {
        const inspector = this.shadowRoot.getElementById('variable-inspector');
        if (inspector) {
            if (show) {
                inspector.classList.remove('hidden');
                inspector.classList.add('visible');
                this.updateInspector();
            } else {
                inspector.classList.remove('visible');
                inspector.classList.add('hidden');
            }
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
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
                
                .notebook-container {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 20px;
                    background: var(--bg-primary);
                    min-height: 100vh;
                    color: var(--text-primary);
                }
                
                .notebook-header {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                
                .title-section {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 15px;
                }
                
                .save-status {
                    font-size: 11px;
                    color: var(--text-secondary);
                    min-width: 150px;
                    text-align: center;
                    padding: 4px 8px;
                    border-radius: 4px;
                    background: var(--bg-cell);
                    border: 1px solid var(--border);
                }
                
                .save-status.dirty {
                    color: var(--warning);
                    border-color: var(--warning);
                }
                
                .save-status.saved {
                    color: var(--success);
                    border-color: var(--success);
                }
                
                .title-input {
                    background: var(--bg-primary);
                    border: 1px solid var(--border);
                    border-radius: 4px;
                    padding: 8px 12px;
                    font-size: 18px;
                    font-weight: bold;
                    color: var(--text-primary);
                    flex: 1;
                    font-family: inherit;
                }
                
                .title-input:focus {
                    outline: none;
                    border-color: var(--accent);
                }
                
                .global-settings {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                    align-items: center;
                }
                
                .global-settings label {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 12px;
                    color: var(--text-secondary);
                    cursor: pointer;
                }
                
                .global-settings input[type="checkbox"] {
                    margin: 0;
                }
                
                .notebook-actions {
                    display: flex;
                    gap: 10px;
                    margin-left: auto;
                }
                
                .btn {
                    background: var(--accent);
                    color: var(--bg-primary);
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                    font-family: inherit;
                    transition: background-color 0.2s;
                }
                
                .btn:hover {
                    background: var(--success);
                }
                
                .btn:disabled {
                    background: var(--border);
                    cursor: not-allowed;
                }
                
                .btn.secondary {
                    background: var(--bg-cell);
                    color: var(--text-primary);
                    border: 1px solid var(--border);
                }
                
                .btn.secondary:hover {
                    background: var(--border);
                }
                
                .main-content {
                    display: flex;
                    gap: 20px;
                }
                
                .cells-container {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    flex: 1;
                }
                
                .variable-inspector {
                    width: 300px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    height: fit-content;
                    max-height: 80vh;
                    position: sticky;
                    top: 20px;
                    overflow: hidden;
                }
                
                .variable-inspector.hidden {
                    display: none;
                }
                
                .variable-inspector.visible {
                    display: block;
                }
                
                .inspector-header {
                    padding: 12px 15px;
                    background: var(--bg-cell);
                    border-bottom: 1px solid var(--border);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .inspector-header h3 {
                    margin: 0;
                    font-size: 14px;
                    color: var(--text-primary);
                }
                
                .inspector-content {
                    padding: 10px;
                    max-height: 70vh;
                    overflow-y: auto;
                }
                
                .variable-item {
                    margin-bottom: 12px;
                    padding: 8px;
                    background: var(--bg-primary);
                    border: 1px solid var(--border);
                    border-radius: 4px;
                }
                
                .variable-name {
                    font-weight: bold;
                    color: var(--accent);
                    font-size: 12px;
                    margin-bottom: 4px;
                }
                
                .variable-value {
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    font-size: 11px;
                    color: var(--text-secondary);
                    white-space: pre-wrap;
                    word-break: break-all;
                    max-height: 100px;
                    overflow-y: auto;
                }
                
                .variable-type {
                    font-size: 10px;
                    color: var(--warning);
                    margin-top: 4px;
                    font-style: italic;
                }
                
                .add-cell-section {
                    display: flex;
                    justify-content: center;
                    padding: 20px;
                }
                
                .file-input {
                    display: none;
                }
                
                .status-bar {
                    position: sticky;
                    bottom: 0;
                    background: var(--bg-secondary);
                    border-top: 1px solid var(--border);
                    padding: 10px 20px;
                    display: flex;
                    justify-content: between;
                    align-items: center;
                    font-size: 12px;
                    color: var(--text-secondary);
                }
                
                .status-info {
                    flex: 1;
                }
                
                .executing-indicator {
                    display: none;
                    color: var(--accent);
                }
                
                .executing-indicator.active {
                    display: block;
                }
            </style>
            
            <div class="notebook-container">
                <div class="notebook-header">
                    <div class="title-section">
                        <input type="text" class="title-input" 
                               value="${this.title}" 
                               placeholder="Notebook Title">
                        <div class="save-status" id="save-status">
                            ${this.getSaveStatusText()}
                        </div>
                        <div class="notebook-actions">
                            <button class="btn secondary" id="new-btn">New</button>
                            <button class="btn secondary" id="load-btn">Load</button>
                            <button class="btn secondary" id="save-btn">${this.currentFilePath ? 'Save' : 'Save As...'}</button>
                            <button class="btn" id="run-all-btn">Run All</button>
                            <button class="btn secondary" id="clear-all-btn">Clear All</button>
                        </div>
                    </div>
                    
                    <div class="global-settings">
                        <span style="font-weight: bold; margin-right: 10px;">Global Settings:</span>
                        <label>
                            <input type="checkbox" id="global-strict" ${this.globalSettings.strict ? 'checked' : ''}>
                            Strict
                        </label>
                        <label>
                            <input type="checkbox" id="global-nix-compat" ${this.globalSettings.nixCompat ? 'checked' : ''}>
                            Nix Compat
                        </label>
                        <label>
                            <input type="checkbox" id="global-raw-mode" ${this.globalSettings.rawMode ? 'checked' : ''}>
                            Raw Mode
                        </label>
                        <label>
                            <input type="checkbox" id="global-autosave" ${this.globalSettings.autosave ? 'checked' : ''}>
                            Autosave
                        </label>
                        <label>
                            <input type="checkbox" id="show-inspector" ${this.globalSettings.showInspector ? 'checked' : ''}>
                            Variable Inspector
                        </label>
                    </div>
                </div>
                
                <div class="main-content">
                    <div class="cells-container" id="cells-container">
                        <!-- Cells will be inserted here -->
                    </div>
                    
                    <div class="variable-inspector ${this.globalSettings.showInspector ? 'visible' : 'hidden'}" id="variable-inspector">
                        <div class="inspector-header">
                            <h3>Variable Inspector</h3>
                            <button class="btn secondary small" id="refresh-inspector">⟳</button>
                        </div>
                        <div class="inspector-content" id="inspector-content">
                            ${this.getInspectorContent()}
                        </div>
                    </div>
                </div>
                
                <div class="add-cell-section">
                    <button class="btn" id="add-cell-btn">+ Add Cell</button>
                </div>
                
                <div class="status-bar">
                    <div class="status-info">
                        <span id="cell-count">${this.cells.length} cells</span> • 
                        <span id="variable-count">${this.globalScope.size} variables</span>
                    </div>
                    <div class="executing-indicator" id="executing-indicator">
                        Executing...
                    </div>
                </div>
                
                <input type="file" class="file-input" id="file-input" accept=".nixnb,.json">
            </div>
        `;
    }

    setupEventHandlers() {
        const titleInput = this.shadowRoot.querySelector('.title-input');
        titleInput.addEventListener('input', (e) => {
            this.title = e.target.value;
            this.markDirty();
        });

        // Global settings handlers
        const globalSettings = this.shadowRoot.querySelectorAll('.global-settings input[type="checkbox"]');
        globalSettings.forEach(input => {
            input.addEventListener('change', (e) => {
                const setting = e.target.id.replace('global-', '').replace('-', '');
                const settingName = setting === 'nixcompat' ? 'nixCompat' : 
                                  setting === 'rawmode' ? 'rawMode' : 
                                  setting === 'showinspector' ? 'showInspector' : setting;
                this.globalSettings[settingName] = e.target.checked;
                
                // Handle inspector toggle
                if (settingName === 'showInspector') {
                    this.toggleInspector(e.target.checked);
                }
                
                this.markDirty();
            });
        });

        // Action handlers
        this.shadowRoot.getElementById('new-btn').addEventListener('click', () => {
            this.createNewNotebook();
        });

        this.shadowRoot.getElementById('add-cell-btn').addEventListener('click', () => {
            this.addCell();
        });

        this.shadowRoot.getElementById('run-all-btn').addEventListener('click', () => {
            this.runAllCells();
        });

        this.shadowRoot.getElementById('clear-all-btn').addEventListener('click', () => {
            this.clearAllOutputs();
        });

        this.shadowRoot.getElementById('load-btn').addEventListener('click', async () => {
            // Try to use File System Access API if available
            if ('showOpenFilePicker' in window) {
                try {
                    const [fileHandle] = await window.showOpenFilePicker({
                        types: [{
                            description: 'Nix Notebook files',
                            accept: { 'application/json': ['.nixnb'] }
                        }]
                    });
                    
                    const file = await fileHandle.getFile();
                    this.currentFileHandle = fileHandle;
                    this.loadFromFile(file);
                    return;
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.warn('Failed to open file:', error);
                    }
                    // Fall back to file input
                }
            }
            
            // Fall back to file input for browsers without File System Access API
            this.shadowRoot.getElementById('file-input').click();
        });

        this.shadowRoot.getElementById('save-btn').addEventListener('click', () => {
            if (this.currentFilePath) {
                this.saveToExistingFile();
            } else {
                this.saveAsNewFile();
            }
        });

        this.shadowRoot.getElementById('file-input').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.loadFromFile(e.target.files[0]);
            }
        });

        // Inspector refresh button
        this.shadowRoot.getElementById('refresh-inspector')?.addEventListener('click', () => {
            this.updateInspector();
        });
    }

    addCell(content = '', index = -1, isTextMode = false) {
        const cellId = `cell-${++this.cellIdCounter}`;
        const cell = {
            id: cellId,
            content: content,
            output: '',
            error: null,
            liveMode: true,
            isVariable: false,
            variableName: null,
            isTextMode: isTextMode,
            showCode: !isTextMode, // Text cells start with code hidden, code cells show code by default
            isInherit: false // Whether this cell inherits its result attrset into global scope
        };

        if (index === -1) {
            this.cells.push(cell);
        } else {
            this.cells.splice(index, 0, cell);
        }

        this.renderCells();
        this.updateStatus();
        this.markDirty();
        
        return cell;
    }

    removeCell(cellId) {
        const index = this.cells.findIndex(c => c.id === cellId);
        if (index !== -1) {
            const cell = this.cells[index];
            // Remove variable from global scope if it was defined by this cell
            if (cell.isVariable && cell.variableName) {
                this.globalScope.delete(cell.variableName);
            }
            this.cells.splice(index, 1);
            this.renderCells();
            this.updateStatus();
            this.markDirty();
        }
    }

    renderCells() {
        const container = this.shadowRoot.getElementById('cells-container');
        container.innerHTML = '';

        this.cells.forEach((cell, index) => {
            const cellElement = document.createElement('nix-notebook-cell');
            cellElement.setAttribute('cell-id', cell.id);
            cellElement.setAttribute('cell-index', index);
            cellElement.cellData = cell;
            cellElement.notebook = this;
            container.appendChild(cellElement);
        });
    }

    updateStatus() {
        const cellCountEl = this.shadowRoot.getElementById('cell-count');
        const variableCountEl = this.shadowRoot.getElementById('variable-count');
        
        if (cellCountEl) cellCountEl.textContent = `${this.cells.length} cells`;
        if (variableCountEl) variableCountEl.textContent = `${this.globalScope.size} variables`;
        
        // Update inspector when variables change
        if (this.globalSettings.showInspector) {
            this.updateInspector();
        }
    }

    async runAllCells() {
        if (this.isEvaluating) return;
        
        this.isEvaluating = true;
        this.shadowRoot.getElementById('executing-indicator').classList.add('active');
        
        // Clear global scope and rebuild from scratch
        this.globalScope.clear();
        
        try {
            for (const cell of this.cells) {
                const cellElement = this.shadowRoot.querySelector(`nix-notebook-cell[cell-id="${cell.id}"]`);
                if (cellElement) {
                    await cellElement.evaluateCell(true); // Force evaluation
                }
            }
        } finally {
            this.isEvaluating = false;
            this.shadowRoot.getElementById('executing-indicator').classList.remove('active');
            this.updateStatus();
        }
    }

    clearAllOutputs() {
        this.cells.forEach(cell => {
            cell.output = '';
            cell.error = null;
        });
        this.renderCells();
        this.saveToStorage();
    }

    buildGlobalContext() {
        // Build a context string that defines all global variables
        let context = '';
        for (const [name, value] of this.globalScope) {
            // Escape the value appropriately for Nix
            context += `${name} = ${value};\n`;
        }
        return context;
    }

    markDirty() {
        this.isDirty = true;
        this.updateSaveStatus();
        if (this.globalSettings.autosave) {
            this.debouncedAutosave();
        }
    }

    debouncedAutosave() {
        if (this.autosaveTimer) {
            clearTimeout(this.autosaveTimer);
        }
        
        this.autosaveTimer = setTimeout(() => {
            if (this.currentFilePath && this.isDirty) {
                this.saveToExistingFile();
            }
        }, 5000);
    }

    createNewNotebook() {
        if (this.isDirty && !confirm('You have unsaved changes. Create new notebook anyway?')) {
            return;
        }
        
        this.title = 'Untitled Notebook';
        this.cells = [];
        this.cellIdCounter = 0;
        this.globalScope.clear();
        this.currentFilePath = null;
        this.isDirty = false;
        
        this.render();
        this.addCell();
        this.setupEventHandlers();
        this.updateStatus();
    }

    async saveToExistingFile() {
        if (!this.currentFilePath) {
            this.saveAsNewFile();
            return;
        }
        
        const data = this.getNotebookData();
        const content = JSON.stringify(data, null, 2);
        
        // Try to use File System Access API if available and we have a file handle
        if (this.currentFileHandle && 'showSaveFilePicker' in window) {
            try {
                const writable = await this.currentFileHandle.createWritable();
                await writable.write(content);
                await writable.close();
                
                this.isDirty = false;
                this.lastSaveTime = new Date();
                this.updateSaveStatus();
                console.log(`Saved notebook to ${this.currentFilePath}`);
                return;
            } catch (error) {
                console.warn('Failed to write to file:', error);
                // Fall back to download
            }
        }
        
        // Fall back to download for browsers without File System Access API
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.currentFilePath;
        a.click();
        URL.revokeObjectURL(url);
        
        this.isDirty = false;
        this.lastSaveTime = new Date();
        this.updateSaveStatus();
        console.log(`Downloaded notebook as ${this.currentFilePath}`);
    }

    async saveAsNewFile() {
        const data = this.getNotebookData();
        const content = JSON.stringify(data, null, 2);
        
        // Try to use File System Access API if available
        if ('showSaveFilePicker' in window) {
            try {
                const filename = `${this.title.replace(/[^a-zA-Z0-9]/g, '_')}.nixnb`;
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: filename,
                    types: [{
                        description: 'Nix Notebook files',
                        accept: { 'application/json': ['.nixnb'] }
                    }]
                });
                
                const writable = await fileHandle.createWritable();
                await writable.write(content);
                await writable.close();
                
                this.currentFileHandle = fileHandle;
                this.currentFilePath = fileHandle.name;
                this.isDirty = false;
                this.lastSaveTime = new Date();
                this.updateUrl();
                this.updateSaveButton();
                this.updateSaveStatus();
                console.log(`Saved notebook as ${fileHandle.name}`);
                return;
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.warn('Failed to save file:', error);
                }
                // Fall back to download
            }
        }
        
        // Fall back to download for browsers without File System Access API
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const filename = `${this.title.replace(/[^a-zA-Z0-9]/g, '_')}.nixnb`;
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        
        this.currentFilePath = filename;
        this.isDirty = false;
        this.lastSaveTime = new Date();
        this.updateUrl();
        this.updateSaveButton();
        this.updateSaveStatus();
        console.log(`Downloaded notebook as ${filename}`);
    }

    getNotebookData() {
        return {
            title: this.title,
            globalSettings: this.globalSettings,
            cells: this.cells.map(cell => ({
                content: cell.content,
                liveMode: cell.liveMode,
                isTextMode: cell.isTextMode,
                showCode: cell.showCode,
                isInherit: cell.isInherit
            })),
            version: '1.0'
        };
    }

    updateSaveButton() {
        const saveBtn = this.shadowRoot.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.textContent = this.currentFilePath ? 'Save' : 'Save As...';
        }
    }

    async loadFromFile(file) {
        try {
            const content = await file.text();
            const data = JSON.parse(content);
            
            this.title = data.title || 'Loaded Notebook';
            this.globalSettings = { ...this.globalSettings, ...data.globalSettings };
            this.cellIdCounter = 0;
            this.cells = (data.cells || []).map((cell, index) => ({
                id: `cell-${++this.cellIdCounter}`,
                content: cell.content || '',
                output: '',
                error: null,
                liveMode: cell.liveMode !== false,
                isVariable: false,
                variableName: null,
                isTextMode: cell.isTextMode || false,
                showCode: cell.showCode !== undefined ? cell.showCode : !(cell.isTextMode || false),
                isInherit: cell.isInherit || false
            }));
            
            this.currentFilePath = file.name;
            this.isDirty = false;
            this.globalScope.clear();
            this.render();
            this.renderCells();
            this.setupEventHandlers();
            this.updateStatus();
            console.log(`Loaded notebook: ${file.name}`);
        } catch (e) {
            alert('Failed to load notebook file: ' + e.message);
        }
    }

}

// Mock evaluator for fallback
class MockTvixEvaluator {
    constructor() {
        console.log("Mock Tvix evaluator initialized for notebook");
    }
    
    evaluate(expression, raw) {
        // Simple mock responses
        if (expression.trim().match(/^[a-zA-Z_]\w*\s*=/)) {
            const match = expression.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
            if (match) {
                return `${match[2]} :: (assigned to ${match[1]})`;
            }
        }
        
        if (expression.trim() === '1 + 2') {
            return '3 :: int';
        } else if (expression.includes('hello')) {
            return '"Hello from Tvix notebook!" :: string';
        } else {
            return `Mock result: ${expression}`;
        }
    }
    
    evaluate_with_settings(expression, raw, prettyPrintAst, displayAst, dumpBytecode, traceRuntime, strict, nixCompat) {
        return this.evaluate(expression, raw);
    }
}

// Register the custom element
customElements.define('nix-notebook', NixNotebook);

// Export for direct usage
export { NixNotebook };