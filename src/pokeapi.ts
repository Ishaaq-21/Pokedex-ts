import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  cache = new Cache(1 * 60 * 1000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area/`;
    if (this.cache.get(url)) {
      const cachedData = this.cache.get(url);
      return cachedData?.val;
    }
    const response = await fetch(url);
    const data: ShallowLocations = await response.json();
    this.cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<LocationArea> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}/`;
    if (this.cache.get(url)) {
      const cachedData = this.cache.get(url);
      return cachedData?.val;
    }
    try {
      const response = await fetch(url);

      const data: LocationArea = await response.json();
      this.cache.add(url, data);

      return data;
    } catch (error) {
      throw new Error("Failed to fetch location area");
    }
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
