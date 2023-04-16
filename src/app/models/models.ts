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

export enum UpkeepComplexity {
  LOW = 'low',
  MEDIUM = 'med',
  HIGH = 'high',
}
