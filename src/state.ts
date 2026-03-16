import { getCommands } from "./commands/commands_registry.js";
import * as readline from "readline";
import { PokeAPI } from "./pokeapi.js";
import chalk from "chalk";
import { State } from "./types/types.js";

export function initSTate() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.cyan("Pokedex > "),
  });

  rl.prompt();
  const commandsList = getCommands();
  const pokeApi = new PokeAPI();

  const state: State = {
    commands: commandsList,
    rl: rl,
    pokeApi: pokeApi,
    nextLocationsURL: "",
    prevLocationsURL: "",
    caughtPokemons: [],
  };
  return state;
}
