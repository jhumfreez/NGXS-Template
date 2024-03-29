import { Injectable } from '@angular/core';
import { createPropertySelectors } from '@ngxs/store';
import {
  Action,
  Select,
  Selector,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { patch, append } from '@ngxs/store/operators';
import { updateItem } from '@ngxs/store/operators';
import { mockAnimals, mockZooState } from '../mocks/animal.mock';
import { Animal, Habitat } from '../models/models';
import { getUniqueId } from '../shared/utils';
import { Zoo } from './zoo.actions';

// TODO:
// 1. Nested change is detectable.
// 2. Ensure one selector executed per change.

/**
 * Additional resources:
 * Immer + NGXS tutorial (not used here at the moment)
 * - https://timdeschryver.dev/blog/simple-state-mutations-in-ngrx-with-immer#side-by-side-comparison
 * Check out their stackblitz demo
 * - https://stackoverflow.com/a/65045014/7542688
 */

export interface ZooStateModel {
  title: string;
  inventory: Animal[];
  acceptingNewExhibits: boolean;
}

const ZOO_STATE_TOKEN = new StateToken<ZooStateModel>('zoo');

@State<ZooStateModel>({
  name: ZOO_STATE_TOKEN,
  defaults: mockZooState,
})
// https://angular.io/api/core/Injectable
@Injectable()
export class ZooState {
  // Note: Default behavior in docs seems to suggest any Selector derived inside this class will likely behave
  // as if it didn't specify a state to inject. That means this will cause it to execute on every update.
  // - This is not desireable. Selectors that perform operations like finding something in a list (or something more expensive; selectors are capable of async operations) will run way more often than necessary.
  @Selector([ZooState])
  static getZooState(ctx: StateContext<ZooStateModel>) {
    // Uncomment for demo
    // console.log(
    //   '%c' + 'Handling change detected for entire state!',
    //   'color: orange'
    // );
    return ctx.getState();
  }

  @Selector([ZooState.getZooState])
  static getInventory(zoo: ZooStateModel) {
    // static getInventory(ctx: StateContext<ZooStateModel>) {
    // Note: Default behavior for selectors changes in v4 is to not require injection of state, because it will cause each selector to re-execute on all changes.
    // https://www.ngxs.io/concepts/select#selector-options
    // https://www.ngxs.io/advanced/optimizing-selectors
    console.log('%c' + 'Handling change detected for inventory', 'color: cyan');
    return zoo.inventory;
  }

  // Unused
  // Note: Should probably consider memoizing this.
  // https://www.ngxs.io/advanced/optimizing-selectors
  @Selector()
  static getAnimal(ctx: StateContext<ZooStateModel>, animalName: string) {
    return ctx.getState().inventory.find((x) => x.name === animalName);
  }

  // https://www.ngxs.io/advanced/operators#advanced-example
  @Action(Zoo.InsertAnimal)
  insertAnimal(ctx: StateContext<ZooStateModel>, action: Zoo.InsertAnimal) {
    // For demo
    // console.log('%c' + `Patching Inventory...`, 'color:yellow');

    // Note: structuredClone supported in NodeJS v17+
    // - For types: @types/node (version should match the one supported by your NodeJS runtime)
    // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone#browser_compatibility
    const newAnimal: Animal = structuredClone(action.animal);

    // Note: Unsure if patchState supports state operators.
    ctx.setState(
      patch<ZooStateModel>({
        inventory: append<Animal>([
          {
            ...newAnimal,
            id: getUniqueId(),
            dateModified: Date.now(),
          },
        ]),
      })
    );

    const len = ctx.getState().inventory.length;
    const latest = ctx.getState().inventory[len - 1];
    // For demo
    // console.log('%c' + `Patched Inventory (${len}):`, 'color:yellow', latest);
    if (
      latest === action.animal ||
      latest.categories === action.animal.categories
    ) {
      console.warn('FIXME: Change should not be by reference!');
    }
  }

  // Gets complicated in a hurry. May have to consider flattening
  // https://www.ngxs.io/recipes/style-guide#flatten-deep-object-graphs
  @Action(Zoo.ModAnimal)
  modifyAnimal(ctx: StateContext<ZooStateModel>, action: Zoo.ModAnimal) {
    const patchEntry = structuredClone(action.animal);
    ctx.setState(
      patch<ZooStateModel>({
        inventory: updateItem<Animal>(
          (animal) => animal.id === action.animal.id,
          // Note: Will this overwrite or patch? Assuming overwrite.
          patch<Animal>({
            name: patchEntry.name,
            categories: patchEntry?.categories,
            location: patch<Habitat>({
              // TODO: insert, update, or overwrite?...
              ...patchEntry.location,
            }),
            id: patchEntry.id,
            dateModified: Date.now(),
          })
        ),
      })
    );
  }

  // Unused
  @Action(Zoo.AddLocation)
  addLocation(
    { setState, getState }: StateContext<ZooStateModel>,
    action: Zoo.AddLocation
  ) {
    const state = getState();
    const animal: Animal = structuredClone(
      state.inventory.find((x) => x.id === action.animalId)
    );
    setState(
      patch<ZooStateModel>({
        inventory: updateItem<Animal>(
          (animal) => animal.id === action.animalId,
          {
            ...animal,
            location: animal.location,
          }
        ),
      })
    );
  }

  @Action(Zoo.SetTitle)
  setTitle(ctx: StateContext<ZooStateModel>, action: Zoo.SetTitle) {
    ctx.patchState({
      title: action.title,
    });
  }
}

// NGXS version <4: An alternative solution to turning off injectContainerState
/**
 * Zoo State meta selector
 * * https://www.ngxs.io/concepts/select#meta-selectors
 * * https://www.ngxs.io/advanced/optimizing-selectors#memoization
 */
export class ZooStateQuery {
  // Property selector
  // "Type safety note: The createPropertySelectors function will not require a type
  // parameter if a typed selector or a StateToken that includes the type of the model
  // is provided to the function."
  // src: https://www.ngxs.io/advanced/selector-utils
  // Note: Not available in version 3.7
  static getStateProp = createPropertySelectors(ZOO_STATE_TOKEN);

  @Selector([ZooStateQuery.getStateProp.inventory])
  static getInventory(inventory: Animal[]) {
    console.log(
      '%c' + 'Handling change detected for inventory!',
      'color: lime'
    );
    return inventory;
  }

  // Shouldn't re-run when adding inventory or cause inventory selector to re-run
  @Selector([ZooStateQuery.getStateProp.title])
  static getZooTitle(title: string) {
    console.log('%c' + 'Handling change detected for title', 'color: green');
    return title;
  }
}
