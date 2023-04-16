export interface Animal {
  name: string;
  categories?: string[];
  location: Habitat;
  id: number;
}

// Note: idk if habitat is the right word, but location seemed like it could be confusing.
export interface Habitat {
  regions?: string[];
  countries?: string[];
  biomes: string[];
}

// Filler to simulate a contract w/ arbitrary string values.
export enum UpkeepComplexity {
  LOW = 'low',
  MEDIUM = 'med',
  HIGH = 'high',
}
