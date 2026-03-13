import { State } from "src/state.js";

export async function commandHelp(state: State) {
  console.log("\nWelcome to the Pokedex!");
  console.log("Usage:\n\n");
  const { commands } = state;
  for (const obj in commands) {
    console.log(`\x1b[33m${obj}\x1b[0m: ${commands[obj].description}.`);
  }
}
