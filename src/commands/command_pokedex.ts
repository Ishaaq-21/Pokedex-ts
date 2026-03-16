import { State } from "src/types/types.js";
import chalk from "chalk";
export async function commandPokedex(state: State) {
  if (state.caughtPokemons.length === 0) {
    console.log(
      chalk.red("Your pokedex is empty. Try catching some pokemons first!"),
    );
    return;
  }

  console.log(chalk.bgGreenBright.black("\nYour Pokedex:\n"));
  for (const pokemon of state.caughtPokemons) {
    console.log(chalk.blue(`  - ${pokemon.name}`));
  }
  console.log("\n");
}
