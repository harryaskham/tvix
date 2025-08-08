import { EditorView, basicSetup } from "codemirror"
import { vim, Vim } from "@replit/codemirror-vim"
import { javascript } from "@codemirror/lang-javascript"
import { nord, nordInit } from "@uiw/codemirror-theme-nord"
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"

// Expose Vim globally for mappings
window.Vim = Vim;

// Save expression to localStorage
function saveExpression(content) {
  try {
    localStorage.setItem('tvix-expression', content);
  } catch (e) {
    console.warn('Could not save expression to localStorage:', e);
  }
}

// Load expression from localStorage
function loadExpression() {
  try {
    return localStorage.getItem('tvix-expression') || 'let lib = import <nixpkgs/lib>; in lib';
  } catch (e) {
    console.warn('Could not load expression from localStorage:', e);
    return 'let lib = import <nixpkgs/lib>; in lib';
  }
}

// Global editor instance
window.createTvixEditor = function(element, initialDoc = '', onDocChange = null, onEvaluate = null) {
  // Use saved expression if no initial doc provided
  if (!initialDoc) {
    initialDoc = loadExpression();
  }
  // Create keybindings array
  const keybindings = [indentWithTab];
  
  // Add Ctrl+Enter for evaluation if callback provided
  if (onEvaluate) {
    keybindings.push({
      key: "Ctrl-Enter",
      run: () => {
        console.log('Ctrl+Enter pressed - triggering evaluation');
        onEvaluate();
        return true;
      }
    });
    // Also add Cmd+Enter for Mac users
    keybindings.push({
      key: "Cmd-Enter", 
      run: () => {
        console.log('Cmd+Enter pressed - triggering evaluation');
        onEvaluate();
        return true;
      }
    });
  }
  
  const extensions = [
    // vim must come before basicSetup
    vim(),
    basicSetup,
    javascript(),
    // Add keybindings with high precedence to override vim
    keymap.of(keybindings, { precedence: 'override' })
  ];
  
  // Add document change listener with localStorage saving
  extensions.push(
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        // Save to localStorage
        saveExpression(update.state.doc.toString());
        
        // Call user callback if provided
        if (onDocChange) {
          onDocChange(update);
        }
      }
    })
  );
  
  const editor = new EditorView({
    doc: initialDoc,
    extensions: extensions.concat([
      // Use the official Nord theme
      nord,

      // Additional customizations for our specific styling
      EditorView.theme({
        // Custom overrides for our layout
        '&': {
          fontSize: '14px',
          fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
        },
        '.cm-editor': {
          width: '100%',
          height: '300px',
          border: '1px solid #4c566a',
          borderRadius: '4px'
        },
        '.cm-editor.cm-focused': {
          borderColor: '#88c0d0'
        },
        // Vim mode cursors - improved visibility
        '.cm-vim-normal .cm-cursor': {
          backgroundColor: '#d8dee9',
          borderColor: '#d8dee9',
          width: '8px',
          opacity: '0.8'
        },
        '.cm-vim-insert .cm-cursor': {
          backgroundColor: 'transparent',
          borderLeft: '2px solid #a3be8c',
          borderLeftColor: '#a3be8c',
          borderLeftWidth: '2px'
        },
        '.cm-vim-visual .cm-selectionBackground': {
          backgroundColor: 'rgba(136, 192, 208, 0.4) !important'
        },
        // Improve active line visibility in vim mode
        '.cm-activeLine': {
          backgroundColor: 'rgba(76, 86, 106, 0.3) !important'
        }
      })
    ]),
    parent: element
  });

  // Set up custom vim mappings using the imported Vim object
  setTimeout(() => {
    try {
      // Use the imported and globally exposed Vim object
      if (window.Vim && window.Vim.map) {
        window.Vim.map("jk", "<Esc>", "insert");
        window.Vim.map("kj", "<Esc>", "insert"); 
        window.Vim.map(";", ":");
        
        // Add Ctrl+Enter mapping for evaluation if callback provided
        if (onEvaluate) {
          // Define the evaluation command
          if (window.Vim.defineEx) {
            window.Vim.defineEx('evaluate', 'eval', function() {
              console.log('Vim Ctrl+Enter evaluation triggered');
              onEvaluate();
            });
          }
          // Map Ctrl+Enter in normal and insert modes
          window.Vim.map("<C-CR>", ":evaluate<CR>", "normal");
          window.Vim.map("<C-CR>", "<Esc>:evaluate<CR>a", "insert");
          console.log('✅ Custom vim mappings configured: jk/kj -> Esc, ; -> :, Ctrl+Enter -> evaluate');
        } else {
          console.log('✅ Custom vim mappings configured: jk/kj -> Esc, ; -> :');
        }
      } else if (Vim && Vim.map) {
        Vim.map("jk", "<Esc>", "insert");
        Vim.map("kj", "<Esc>", "insert"); 
        Vim.map(";", ":");
        
        // Add Ctrl+Enter mapping for evaluation if callback provided
        if (onEvaluate) {
          if (Vim.defineEx) {
            Vim.defineEx('evaluate', 'eval', function() {
              console.log('Vim Ctrl+Enter evaluation triggered');
              onEvaluate();
            });
          }
          Vim.map("<C-CR>", ":evaluate<CR>", "normal");
          Vim.map("<C-CR>", "<Esc>:evaluate<CR>a", "insert");
          console.log('✅ Custom vim mappings configured via imported Vim: jk/kj -> Esc, ; -> :, Ctrl+Enter -> evaluate');
        } else {
          console.log('✅ Custom vim mappings configured via imported Vim: jk/kj -> Esc, ; -> :');
        }
      } else {
        console.log('⚠️ Vim object not available:', {
          windowVim: typeof window.Vim,
          importedVim: typeof Vim,
          vimExtension: typeof vim
        });
        console.log('Standard vim still works: hjkl, i, a, o, Esc, :, etc.');
      }
    } catch (e) {
      console.warn('❌ Could not set custom vim mappings:', e);
    }
  }, 200);

  return editor;
}
