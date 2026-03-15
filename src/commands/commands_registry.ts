import { CLICommand } from "src/state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays 20 areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays previous 20 areas",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Explores all pokemon in a given area",
      callback: commandExplore,
    },
  };
}
