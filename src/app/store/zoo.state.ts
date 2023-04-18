import { Injectable } from '@angular/core';
import { Action, Select, State, StateContext, StateToken } from '@ngxs/store';
import { patch, append } from '@ngxs/store/operators';
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
    // Note: Default behavior for selectors changes in v4 is to not require injection of state, because it will cause each selector to re-execute on all changes.
    // https://www.ngxs.io/concepts/select#selector-options
    // debugger;
    console.log('Handling change detected for inventory');
    return ctx.getState().inventory;
  }

  @Select()
  static getAnimal(ctx: StateContext<ZooStateModel>, animalName: string) {
    return ctx.getState().inventory.find((x) => x.name === animalName);
  }

  // https://www.ngxs.io/advanced/operators#advanced-example
  @Action(Zoo.AddAnimal)
  addAnimal(ctx: StateContext<ZooStateModel>, action: Zoo.AddAnimal) {
    // Note: structuredClone supported in NodeJS v17+
    // - For types: @types/node (version should match the one supported by your NodeJS runtime)
    // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone#browser_compatibility
    const newAnimal: Animal = structuredClone(action.animal);

    ctx.setState(
      patch<ZooStateModel>({
        inventory: append<Animal>([newAnimal]),
      })
    );

    const len = ctx.getState().inventory.length;
    const latest = ctx.getState().inventory[len - 1];
    console.log(`Patched Inventory (${len}):`, latest);
    if (
      latest === action.animal ||
      latest.categories === action.animal.categories
    ) {
      console.warn('FIXME: Change should not be by reference!');
    }
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
