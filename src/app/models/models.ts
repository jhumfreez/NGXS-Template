export interface Animal {
  name: string;
  categories?: string[];
  location: Habitat;
  id: string;
  dateModified: number;
}

export interface Habitat {
  countries?: string[];
  biomes: string[];
}

export enum UpkeepComplexity {
  LOW = 'low',
  MEDIUM = 'med',
  HIGH = 'high',
}
