import chalk from "chalk";
import { State } from "src/types/types.js";
export async function commandHelp(state: State) {
  console.log("\nWelcome to the Pokedex!");
  console.log("Usage:\n\n");
  const { commands } = state;
  for (const obj in commands) {
    console.log(`${chalk.yellow(`* ${obj}`)} : ${commands[obj].description}`);
  }
}
