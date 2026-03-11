import { CLICommand } from "./types/types.js";

export function commandExit(commands: Record<string, CLICommand>) {
  console.log("Closing the Pokedex... Goodby!");
  process.exit(0);
}
