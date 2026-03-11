import * as readline from "readline";

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

    console.log(`Your command was: ${wordsArr[0]}`);

    rl.prompt();
  });
}
