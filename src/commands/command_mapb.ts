import chalk from "chalk";
import { ShallowLocations, State } from "src/types/types.js";
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
