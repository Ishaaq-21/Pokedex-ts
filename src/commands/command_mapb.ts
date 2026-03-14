import { ShallowLocations } from "src/pokeapi.js";
import { State } from "src/state.js";
import chalk from "chalk";
export async function commandMapb(state: State) {
  const { pokeApi } = state;
  const locationAreas: ShallowLocations = await pokeApi.fetchLocations(
    state.prevLocationsURL,
  );

  if (!locationAreas || !Array.isArray(locationAreas.results)) {
    console.log("No location areas available");
    return;
  }

  state.nextLocationsURL = locationAreas.next || state.nextLocationsURL;

  if (!state.prevLocationsURL || state.prevLocationsURL === "") {
    console.log(chalk.red("There are no previous locations."));
    console.log(chalk.red("Here are the first page's locations : \n"));
  }
  state.prevLocationsURL = locationAreas.previous || "";

  for (const locationArea of locationAreas.results) {
    console.log(locationArea.name);
  }
}
