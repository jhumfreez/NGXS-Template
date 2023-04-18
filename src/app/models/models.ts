export interface Animal {
  name: string;
  categories?: string[];
  location: Habitat;
  id: number;
}

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
