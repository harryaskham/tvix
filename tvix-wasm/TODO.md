# TODO

- [ ] Colab-like Notebook UI:
  - Web UI with editor cells that share a global scope
  - If a cell is of the form of a regular Nix expression, it is evaluated and the result shown by the cell as usual
  - If a cell is of the form "identifier = Nix expression", the result of the expression is still shown, and the result is stored in the global scope as the given identifier (like in Nix REPL, entering "a = 123" stores 123 in 'a' for further usage in later expressions).
  - Execution settings like strictness (but not liveness) should be set singly for all cells at the top of the page
  - Individual cell editors should show only the editor, the results pane and the liveness setting (plus the Evaluate button if 'live' is off). The liveness setting can be toggled per-cell.
  - Other controls should mimic Colab - run all cells, run all before, run all after, reordering cells, etc.
  - There should be a global "title" control for the notebook, and all cells should persist automatically in a JSON structure to localStorage under the given "title", with the ability to "open" previous notebooks. Any changes made are stored under the current title. It should also be possible to load a valid .nixnb file from disk, at which point changes made are stored as the same sort of JSON object back into that .nixnb file (i.e. global settings, list of ordered cells and their settings, etc) rather than localStorage.
- [ ] Makerule for Notebooks from expressions
  - `make EXPRS="exprs/*.nix" notebook` creates a valid .nixnb file with the cells populated by the expressions in the EXPRS env variable.
