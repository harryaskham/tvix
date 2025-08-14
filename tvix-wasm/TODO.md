# TODO

- [x] Colab-like Notebook UI:
  - Web UI with editor cells that share a global scope
  - If a cell is of the form of a regular Nix expression, it is evaluated and the result shown by the cell as usual
  - If a cell is of the form "identifier = Nix expression", the result of the expression is still shown, and the result is stored in the global scope as the given identifier (like in Nix REPL, entering "a = 123" stores 123 in 'a' for further usage in later expressions).
  - Execution settings like strictness (but not liveness) should be set singly for all cells at the top of the page
  - Individual cell editors should show only the editor, the results pane and the liveness setting (plus the Evaluate button if 'live' is off). The liveness setting can be toggled per-cell.
  - Other controls should mimic Colab - run all cells, run all before, run all after, reordering cells, etc.
  - There should be a global "title" control for the notebook, and all cells should persist automatically in a JSON structure to localStorage under the given "title", with the ability to "open" previous notebooks. Any changes made are stored under the current title. It should also be possible to load a valid .nixnb file from disk, at which point changes made are stored as the same sort of JSON object back into that .nixnb file (i.e. global settings, list of ordered cells and their settings, etc) rather than localStorage.
- [x] Makerule for Notebooks from expressions
  - `make EXPRS="exprs/*.nix" notebook` creates a valid .nixnb file with the cells populated by the expressions in the EXPRS env variable.
- [ ] Additional Notebook UI polish:
  - [x] The localStorage-for-Notebooks pathway is not needed, let's just have the whole thing driven by file IO only.
  - [x] Add a 'New' button for creating new empty Notebooks
  - [x] Add an 'autosave' setting that saves the notebook on change (either editor changes, or settings changes) with a 5 second debounce
  - [x] Remove the 'quick start examples'
  - [x] Remove the 'Nix notebook' header text; the notebook title section serves as the page header overall.
  - [x] Currently, `make notebook` generates cells like "# nix-file.nix" as titles, however these are interpreted as Nix comments instead. Add a "text" mode toggle to cells, and for text mode cells, render as Markdown instead of evaluating as Nix. Respect "live" for these cells where editing the text re-renders the markdown result.
  - [ ] The "live" toggle is missing for text cells, add this back.
  - [ ] The 'save' button still just downloads a .nixnb file. This should instead overwrite the original file (the site should request permissions it needs to operate over local files).
  - [ ] Let's reclaim some vertical space; the "results" should appear to the right of the editor, just as in the embedded blog post example. The cell controls should appear above the results pane only, with the whole left side of the cell being top-to-bottom used for the cell editor. To make this more comfortable, the width of the central UI notebook column can be enlarged slightly.
  - [ ] The cell editor should have start with a fixed viewport height of 20 lines, or the number of lines of the code it contains, whichever is smaller. There should be an expand toggle that grows the cell to show the entire code, or contracts it back to 20 lines (or the number of lines present)
  - [ ] Drop the "In[1]" "Out[1]", it's clear what is the expression and what is the result already.
  - [ ] Cells should have a "Show Code" toggle that is persistent in the notebook JSON, which entirely hides the code of the cell if set, and only shows the results. Text cells should have Show Code on by default.
  - [ ] `make notebook` should generate code cells that are not "live" by default.
  - [ ] Small buttons on each cell controls panel for "Add cell above" and "Add cell below"
  - [ ] "New Cell" currently adds a cell with duplicate code to an existing cell - it should add an empty cell.
  
