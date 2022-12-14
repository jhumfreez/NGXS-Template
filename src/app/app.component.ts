import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { StateReset } from 'ngxs-reset-plugin';
import { Observable } from 'rxjs';
import { mockAnimals } from './mocks/animal.mock';
import { Animal } from './models/models';
import { AddAnimal } from './store/zoo.actions';
import { ZooState } from './store/zoo.state';
import { getRandomInt } from './shared/utils';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Select(ZooState.getInventory)
  animals$: Observable<Animal[]>;

  constructor(private store: Store) {}

  addAnimal() {
    const randAnimal = this.getRandomAnimal();
    this.store.dispatch(new AddAnimal(randAnimal));
  }

  resetState() {
    // https://github.com/ng-turkey/ngxs-reset-plugin
    this.store.dispatch(new StateReset(ZooState));
  }

  private getRandomAnimal(): Animal {
    const randIndex = getRandomInt(mockAnimals.length - 1);
    return mockAnimals[randIndex];
  }
}
