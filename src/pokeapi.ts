export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area/`;
    const response = await fetch(url);
    const data: ShallowLocations = await response.json();
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location/${locationName}/`;
    const response = await fetch(url);
    const data: Location = await response.json();
    return data;
  }
}

export type ShallowLocations = {
  count: number; // total number of locations
  next: string | null; // next page URL
  previous: string | null; // previous page URL
  results: NamedAPIResource[]; // shallow location objects
};

type Name = {
  name: string;
  language: {
    name: string;
    url: string;
  };
};

type GenerationGameIndex = {
  game_index: number;
  generation: {
    name: string;
    url: string;
  };
};

type NamedAPIResource<T = any> = {
  name: string;
  url: string;
};

type Location = {
  id: number;
  name: string;
  region: NamedAPIResource;
  names: Name[];
  game_indices: GenerationGameIndex[];
  areas: NamedAPIResource[];
};
