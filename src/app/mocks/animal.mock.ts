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
      continents: ['Australia'],
      biomes: ['forest'],
    },
  },
  {
    name: 'Bengal Tiger',
    id: 1,
    categories: ['mammal', 'big cat', 'carnivore'],
    location: {
      countries: ['India'],
      continents: ['South Asia'],
      biomes: ['jungle'],
    },
  },
  {
    name: 'Great White Shark',
    id: 2,
    categories: ['shark', 'carnivore'],
    location: {
      continents: ['North America'],
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
      continents: ['South Asia'],
      biomes: ['forest'],
    },
  },
  penguin: {
    name: 'Emperor Penguin',
    // id omitted
    categories: ['bird', 'fowl', 'herbivore'],
    location: {
      countries: [],
      continents: ['Antarctica'],
      biomes: ['tundra'],
    },
  },
};
