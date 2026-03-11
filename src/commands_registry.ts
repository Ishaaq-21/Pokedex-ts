import { commandExit } from "./command_exit.js";
import { CLICommand } from "./types/types.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
  };
}
