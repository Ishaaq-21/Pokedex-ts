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

  async fetchPokemon(pokemonName: string): Promise<SimplePokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    if (this.cache.get(url)) {
      const cachedData = this.cache.get(url);
      return cachedData?.val;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      const pokeObj: SimplePokemon = {
        id: data.id,
        name: data.name,
        base_experience: data.base_experience,
        height: data.height,
        weight: data.weight,
        stats: data.stats,
        types: data.types,
      };
      return pokeObj;
    } catch (error) {
      throw new Error("Failed to fetch Pokemon");
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

type NamedAPIResource<T = any> = {
  name: string;
  url: string;
};

export type LocationArea = {
  id: number;
  name: string;

  location: NamedAPIResource;

  game_index: number;

  encounter_method_rates: EncounterMethodRate[];

  names: Name[];

  pokemon_encounters: PokemonEncounter[];
};
type EncounterMethodRate = {
  encounter_method: NamedAPIResource;
  version_details: EncounterVersionDetails[];
};

type EncounterVersionDetails = {
  rate: number;
  version: NamedAPIResource;
};

type PokemonEncounter = {
  pokemon: NamedAPIResource;
  version_details: PokemonVersionEncounter[];
};

type PokemonVersionEncounter = {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: EncounterDetail[];
};

type EncounterDetail = {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResource[];
  chance: number;
  method: NamedAPIResource;
};
