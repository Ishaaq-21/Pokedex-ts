import { ShallowLocations } from "src/pokeapi.js";
import { State } from "src/state.js";

export async function commandMap(state: State) {
  const { pokeApi } = state;
  const locationAreas: ShallowLocations = await pokeApi.fetchLocations(
    state.nextLocationsURL,
  );

  if (!locationAreas || !Array.isArray(locationAreas.results)) {
    console.log("No location areas available");
    return;
  }

  state.nextLocationsURL = locationAreas.next || state.nextLocationsURL;
  state.prevLocationsURL = locationAreas.previous || state.prevLocationsURL;

  for (const locationArea of locationAreas.results) {
    console.log(locationArea.name);
  }
}
