import chalk from "chalk";
import { State } from "src/types/types.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log(chalk.red("Please provide a pokemon name to catch ✗"));
    return;
  }
  const pokeName = args[0];
  console.log(chalk.bgCyan.black(`\nThrowing a Pokeball at ${pokeName}...\n`));
  const { pokeApi } = state;

  const pokemon = await pokeApi.fetchPokemon(pokeName);

  const wasCaught = isCaught(pokemon.base_experience);

  console.log(
    wasCaught
      ? `${pokeName} was caught ✓✓`
      : chalk.red(`${pokeName} escaped !`),
  );
}

const isCaught = (baseExp: number): boolean => {
  const max_exp = 300;
  const catchChance = 1 - baseExp / max_exp;

  const chance = Math.min(Math.max(catchChance, 0.05), 0.95);

  return Math.random() < chance;
};
