import { State } from "src/state.js";
import chalk from "chalk";
export async function commandHelp(state: State) {
  console.log("\nWelcome to the Pokedex!");
  console.log("Usage:\n\n");
  const { commands } = state;
  for (const obj in commands) {
    console.log(`${chalk.yellow(`* ${obj}`)} : ${commands[obj].description}`);
  }
}
