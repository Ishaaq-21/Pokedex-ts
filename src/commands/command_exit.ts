import { State } from "src/types/types.js";

export async function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  const { rl } = state;
  rl.close();
  process.exit(0);
}
