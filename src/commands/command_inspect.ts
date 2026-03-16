import { SimplePokemon, State } from "src/types/types.js";
import chalk from "chalk";
export async function commandInspect(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log(chalk.red("Please provide a pokemon name to inspect ✗"));
  }

  const pokemonName = args[0];
  const inspectedPokemon = state.caughtPokemons.find((pokemon) => {
    return pokemon.name.toLowerCase() === pokemonName.toLowerCase();
  });

  if (!inspectedPokemon) {
    console.log(
      chalk.red(
        `Your haven't caught ${chalk.bgWhite(pokemonName)} yet. Please try to catch the pokemon and try again ✗`,
      ),
    );
    return;
  }

  displayPokemonInfo(inspectedPokemon);
}

const displayPokemonInfo = (inspectedPok: SimplePokemon) => {
  console.log(
    chalk.green("\n================ Pokémon Info ================\n"),
  );

  console.log(`${chalk.yellow(" Name:")} ${chalk.blue(inspectedPok.name)}`);
  console.log(
    `${chalk.yellow(" Base Experience:")} ${chalk.blue(inspectedPok.base_experience)}`,
  );
  console.log(` ${chalk.yellow("Height:")} ${chalk.blue(inspectedPok.height)}`);
  console.log(` ${chalk.yellow("Weight:")} ${chalk.blue(inspectedPok.weight)}`);

  console.log(chalk.yellow("\n Stats:"));
  for (const stat of inspectedPok.stats) {
    console.log(
      `   ${chalk.yellow(stat.stat.name.padEnd(15, " "))}  : ${chalk.blue(stat.base_stat)}`,
    );
  }

  console.log(chalk.yellow(" \n Types:"));
  for (const type of inspectedPok.types) {
    console.log(`   - ${chalk.yellow(type.type.name)}`);
  }

  console.log(chalk.green("\n============================================\n"));
};
