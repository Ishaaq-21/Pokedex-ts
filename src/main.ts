// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initSTate } from "./state.js";

const state = initSTate();
function main() {
  startREPL(state);
}

main();
