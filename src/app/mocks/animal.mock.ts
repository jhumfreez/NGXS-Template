import { Animal } from '../models/models';
import { getUniqueId } from '../shared/utils';
import { ZooStateModel } from '../store/zoo.state';

// I am not a biologist... or great at geography, etc. :P

// Format of a Map if stored in an acceptable format for NGXS
// - Note: Suggestion is also to flatten deep objects
// https://www.ngxs.io/recipes/style-guide#flatten-deep-object-graphs
export const extraMockAnimals: Record<string, Animal> = {
  peacock: {
    name: 'Peacock',
    id: getUniqueId(),
    categories: ['bird', 'fowl', 'herbivore'],
    location: {
      countries: ['India'],
      biomes: ['forest'],
    },
    dateModified: 0,
  },
  penguin: {
    name: 'Emperor Penguin',
    id: getUniqueId(),
    categories: ['bird', 'fowl', 'herbivore'],
    location: {
      countries: [],
      biomes: ['tundra'],
    },
    dateModified: 0,
  },
  ostrich: {
    name: 'Ostrich',
    id: getUniqueId(),
    categories: ['bird', 'fowl', 'herbivore'],
    location: {
      countries: ['Madagascar', 'Saudi Arabia'],
      biomes: ['sahara'],
    },
    dateModified: 0,
  },
};

// Note about readonly issue: https://stackoverflow.com/questions/53617972/exported-variables-are-read-only
export const mockAnimals: Animal[] = [
  {
    name: 'Koala',
    id: getUniqueId(),
    categories: ['mammal', 'marsupial', 'herbivore'],
    location: {
      countries: ['Australia'],
      biomes: ['forest'],
    },
    dateModified: 0,
  },
  {
    name: 'Bengal Tiger',
    id: getUniqueId(),
    categories: ['mammal', 'big cat', 'carnivore'],
    location: {
      countries: ['India'],
      biomes: ['jungle'],
    },
    dateModified: 0,
  },
  {
    name: 'Great White Shark',
    id: getUniqueId(),
    categories: ['shark', 'carnivore'],
    location: {
      biomes: ['Atlantic Ocean'],
    },
    dateModified: 0,
  },
  extraMockAnimals['peacock'],
  extraMockAnimals['ostrich'],
  extraMockAnimals['penguin'],
];

export const mockZooState: ZooStateModel = {
  title: 'San Diego',
  acceptingNewExhibits: true,
  inventory: mockAnimals.slice(0, 3),
};
