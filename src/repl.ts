import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

export function startREPL(state: State) {
  const { rl, commands } = state;

  rl.on("line", (input: string) => {
    const wordsArr = cleanInput(input);

    if (wordsArr.length === 0) {
      rl.prompt();
      return;
    }

    const command = wordsArr[0];

    if (command in commands) {
      try {
        commands[command].callback(state);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    } else {
      console.log("Unknown command");
    }
    rl.prompt();
  });
}
