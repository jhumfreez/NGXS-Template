import { Injectable } from '@angular/core';
import { Action, Select, State, StateContext, StateToken } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { updateItem } from '@ngxs/store/operators';
import { Animal } from '../models/models';
import { AddAnimal, AddLocation } from './zoo.actions';

export interface ZooStateModel {
  title: string;
  inventory: Animal[];
  acceptingNewExhibits: boolean;
}

const ZOO_STATE_TOKEN = new StateToken<ZooStateModel>('zoo');

@State({
  name: ZOO_STATE_TOKEN,
  defaults: {
    acceptingNewExhibits: true,
    title: '',
    inventory: [],
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

  @Action(AddAnimal)
  addAnimal(ctx: StateContext<ZooStateModel>, action: AddAnimal) {
    const state = ctx.getState();
    ctx.patchState({
      inventory: [...state.inventory, action.animal],
    });
  }

  @Action(AddLocation)
  addAlias(
    { setState, getState }: StateContext<ZooStateModel>,
    action: AddLocation
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
