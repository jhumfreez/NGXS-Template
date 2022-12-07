import { Animal } from '../models/models';
import { ZooStateModel } from '../store/zoo.state';

// I am not a biologist... or great at geography, etc. :P
export const mockAnimals: Animal[] = [
  {
    name: 'Koala',
    id: 0,
    categories: ['mammal', 'marsupial', 'herbivore'],
    location: {
      countries: ['Australia'],
      regions: ['Australia'],
      biomes: ['forest'],
    },
  },
  {
    name: 'Bengal Tiger',
    id: 1,
    categories: ['mammal', 'big cat', 'carnivore'],
    location: {
      countries: ['India'],
      regions: ['South Asia'],
      biomes: ['jungle'],
    },
  },
  {
    name: 'Great White Shark',
    id: 2,
    categories: ['shark', 'carnivore'],
    location: {
      regions: ['North America'],
      biomes: ['Salt Water', 'Atlantic Ocean'],
    },
  },
];

export const mockZooState: ZooStateModel = {
  title: 'San Diego Zoo',
  acceptingNewExhibits: true,
  inventory: mockAnimals,
};

export const extraMockAnimals: Record<string, Partial<Animal>> = {
  peacock: {
    name: 'Peacock',
    // id omitted
    categories: ['bird', 'fowl', 'herbivore'],
    location: {
      countries: ['India'],
      regions: ['South Asia'],
      biomes: ['forest'],
    },
  },
  penguin: {
    name: 'Emperor Penguin',
    // id omitted
    categories: ['bird', 'fowl', 'herbivore'],
    location: {
      countries: [],
      regions: ['Antarctica'],
      biomes: ['tundra'],
    },
  },
  ostrich: {
    name: 'Emperor Penguin',
    // id omitted
    categories: ['bird', 'fowl', 'herbivore'],
    location: {
      countries: ['Madagascar', 'Saudi Arabia'],
      regions: ['Africa', 'West Asia'],
      biomes: ['tundra'],
    },
  }
};
