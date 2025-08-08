import { nodeResolve } from "@rollup/plugin-node-resolve"

export default {
  input: "./editor.mjs",
  output: {
    file: "./codemirror-bundle.js",
    format: "iife",
    name: "TvixEditor"
  },
  plugins: [nodeResolve({
    preferBuiltins: false
  })]
}