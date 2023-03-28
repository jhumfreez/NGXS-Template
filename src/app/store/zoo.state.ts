import { Injectable } from '@angular/core';
import { Action, Select, State, StateContext, StateToken } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { updateItem } from '@ngxs/store/operators';
import { mockAnimals } from '../mocks/animal.mock';
import { Animal } from '../models/models';
import { Zoo } from './zoo.actions';

export interface ZooStateModel {
  title: string;
  inventory: Animal[];
  acceptingNewExhibits: boolean;
}

const ZOO_STATE_TOKEN = new StateToken<ZooStateModel>('zoo');

@State<ZooStateModel>({
  name: ZOO_STATE_TOKEN,
  defaults: {
    acceptingNewExhibits: true,
    title: '',
    inventory: mockAnimals,
  },
})
// https://angular.io/api/core/Injectable
@Injectable()
export class ZooState {
  @Select()
  static getZooTitle(ctx: StateContext<ZooStateModel>) {
    return ctx.getState().title;
  }

  @Select()
  static getInventory(ctx: StateContext<ZooStateModel>) {
    return ctx.getState().inventory;
  }

  @Select()
  static getAnimal(ctx: StateContext<ZooStateModel>, animalName: string) {
    return ctx.getState().inventory.find((x) => x.name === animalName);
  }

  @Action(Zoo.AddAnimal)
  addAnimal(ctx: StateContext<ZooStateModel>, action: Zoo.AddAnimal) {
    const state = ctx.getState();
    ctx.patchState({
      inventory: [...state.inventory, action.animal],
    });
  }

  @Action(Zoo.AddLocation)
  addAlias(
    { setState, getState }: StateContext<ZooStateModel>,
    action: Zoo.AddLocation
  ) {
    const state = getState();
    const animal: Animal = structuredClone(
      state.inventory.find((x) => x.id === action.animalId)
    );
    setState(
      patch<ZooStateModel>({
        inventory: updateItem<Animal>((x) => x.id === action.animalId, {
          ...animal,
          location: animal.location,
        }),
      })
    );
  }
}
