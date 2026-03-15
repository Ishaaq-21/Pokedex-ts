import { Cache } from "./pokecache.js";
import {
  LocationArea,
  ShallowLocations,
  SimplePokemon,
} from "./types/types.js";

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
