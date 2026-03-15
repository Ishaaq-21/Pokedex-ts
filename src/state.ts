import { Interface } from "node:readline";
import { getCommands } from "./commands/commands_registry.js";
import * as readline from "readline";
import { PokeAPI } from "./pokeapi.js";
import chalk from "chalk";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  commands: Record<string, CLICommand>;
  rl: Interface;
  pokeApi: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

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
  };
  return state;
}
