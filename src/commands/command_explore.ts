import chalk from "chalk";
import { State } from "src/state.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log(chalk.red("No location name was provided X"));
    console.log(chalk.red("Please provide a location name and try again :)"));
    return;
  }

  const locationName: string = args[0];
  const { pokeApi } = state;
  console.log(chalk.bgYellow.black(`\nExploring ${locationName}...`));

  const locationAreaResp = await pokeApi.fetchLocation(locationName);

  if (locationAreaResp.pokemon_encounters.length === 0) {
    console.log(
      chalk.red("No Pokemon encounters found in the provided Area ✗ :("),
    );
  }
  const { pokemon_encounters } = locationAreaResp;
  console.log("Found Pokemon ✓ : ");

  for (const encounter of pokemon_encounters) {
    console.log(" - ", chalk.blueBright(encounter.pokemon.name));
  }
}
