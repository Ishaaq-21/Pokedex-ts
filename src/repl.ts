import * as readline from "readline";
import { CLICommand } from "./types/types.js";
import { getCommands } from "./commands_registry.js";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  rl.prompt();

  rl.on("line", (input: string) => {
    const wordsArr = cleanInput(input);

    if (wordsArr.length === 0) {
      rl.prompt();
      return;
    }

    const command = wordsArr[0];

    const commandsList: Record<string, CLICommand> = getCommands();

    if (command in commandsList) {
      commandsList[command].callback(commandsList);
    } else {
      console.log("Unknown command");
    }
    rl.prompt();
  });
}
