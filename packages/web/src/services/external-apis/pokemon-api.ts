// Pokemon API Service
// Using PokeAPI - Free and public Pokemon API
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny?: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny?: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  color: {
    name: string;
  };
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
    version: {
      name: string;
    };
  }>;
  habitat?: {
    name: string;
    url: string;
  };
  generation: {
    name: string;
    url: string;
  };
}

class PokemonApiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  async getPokemon(idOrName: string | number): Promise<Pokemon> {
    const response = await fetch(`${this.baseUrl}/pokemon/${idOrName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon: ${response.statusText}`);
    }
    return response.json();
  }

  async getPokemonSpecies(idOrName: string | number): Promise<PokemonSpecies> {
    const response = await fetch(`${this.baseUrl}/pokemon-species/${idOrName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon species: ${response.statusText}`);
    }
    return response.json();
  }

  async getRandomPokemon(): Promise<Pokemon> {
    // Get random Pokemon from first 1010 (total as of Gen IX)
    const randomId = Math.floor(Math.random() * 1010) + 1;
    return this.getPokemon(randomId);
  }

  async getRandomPokemonWithDetails(): Promise<{ pokemon: Pokemon; species: PokemonSpecies }> {
    const pokemon = await this.getRandomPokemon();
    const species = await this.getPokemonSpecies(pokemon.id);
    return { pokemon, species };
  }

  // Helper methods
  getTypeColor(type: string): string {
    const typeColors: Record<string, string> = {
      normal: '#A8A878',
      fighting: '#C03028',
      flying: '#A890F0',
      poison: '#A040A0',
      ground: '#E0C068',
      rock: '#B8A038',
      bug: '#A8B820',
      ghost: '#705898',
      steel: '#B8B8D0',
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      psychic: '#F85888',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      fairy: '#EE99AC',
    };
    return typeColors[type] || '#68A090';
  }

  getStatName(statName: string): string {
    const statNames: Record<string, string> = {
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
      speed: 'Speed',
    };
    return statNames[statName] || statName;
  }

  formatPokemonName(name: string): string {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  getPokemonDescription(species: PokemonSpecies): string {
    const englishEntry = species.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    return englishEntry?.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ') || 'No description available.';
  }
}

export const pokemonApi = new PokemonApiService();
