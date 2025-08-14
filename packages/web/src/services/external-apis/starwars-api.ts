// Star Wars API Service
// Using SWAPI (Star Wars API) - Free and public API
export interface StarWarsPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface StarWarsPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface StarWarsFilm {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface StarWarsStarship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface StarWarsApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

class StarWarsApiService {
  private readonly baseUrl = 'https://swapi.dev/api';

  private async fetchData<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Star Wars API error: ${response.statusText}`);
    }
    return response.json();
  }

  async getPeople(page: number = 1): Promise<StarWarsApiResponse<StarWarsPerson>> {
    return this.fetchData<StarWarsApiResponse<StarWarsPerson>>(`/people/?page=${page}`);
  }

  async getPerson(id: number): Promise<StarWarsPerson> {
    return this.fetchData<StarWarsPerson>(`/people/${id}/`);
  }

  async getPlanets(page: number = 1): Promise<StarWarsApiResponse<StarWarsPlanet>> {
    return this.fetchData<StarWarsApiResponse<StarWarsPlanet>>(`/planets/?page=${page}`);
  }

  async getPlanet(id: number): Promise<StarWarsPlanet> {
    return this.fetchData<StarWarsPlanet>(`/planets/${id}/`);
  }

  async getFilms(): Promise<StarWarsApiResponse<StarWarsFilm>> {
    return this.fetchData<StarWarsApiResponse<StarWarsFilm>>('/films/');
  }

  async getFilm(id: number): Promise<StarWarsFilm> {
    return this.fetchData<StarWarsFilm>(`/films/${id}/`);
  }

  async getStarships(page: number = 1): Promise<StarWarsApiResponse<StarWarsStarship>> {
    return this.fetchData<StarWarsApiResponse<StarWarsStarship>>(`/starships/?page=${page}`);
  }

  async getStarship(id: number): Promise<StarWarsStarship> {
    return this.fetchData<StarWarsStarship>(`/starships/${id}/`);
  }

  async getRandomCharacter(): Promise<StarWarsPerson> {
    const randomId = Math.floor(Math.random() * 83) + 1; // SWAPI has ~83 characters
    return this.getPerson(randomId);
  }

  async getRandomPlanet(): Promise<StarWarsPlanet> {
    const randomId = Math.floor(Math.random() * 60) + 1; // SWAPI has ~60 planets
    return this.getPlanet(randomId);
  }
}

export const starWarsApi = new StarWarsApiService();
