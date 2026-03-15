import { Interface } from "node:readline";
import { PokeAPI } from "src/pokeapi.js";

//----------------------------   Main types -----------------------------
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  commands: Record<string, CLICommand>;
  rl: Interface;
  pokeApi: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export type ShallowLocations = {
  count: number; // total number of locations
  next: string | null; // next page URL
  previous: string | null; // previous page URL
  results: NamedAPIResource[]; // shallow location objects
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

export type SimplePokemon = {
  id: number;
  name: string;
  base_experience: number;
  stats: PokemonStat[];
  height: number;
  weight: number;
  types: PokemonType[];
};

/* --------------------------------------------------------- */

//Sub types
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

export type PokemonStat = {
  base_stat: number; // the value of the stat
  effort: number; // EVs gained when defeating this Pokémon
  stat: {
    name: string; // stat name: "hp", "attack", "defense", etc.
    url: string; // link to the full stat resource
  };
};

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
