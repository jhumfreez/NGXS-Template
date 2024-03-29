import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { StateReset } from 'ngxs-reset-plugin';
import { Observable, tap } from 'rxjs';
import { mockAnimals } from './mocks/animal.mock';
import { Animal } from './models/models';
import { Zoo } from './store/zoo.actions';
import { ZooState, ZooStateQuery } from './store/zoo.state';
import { getRandomInt } from './shared/utils';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Select(ZooStateQuery.getZooTitle)
  title$: Observable<string>;

  @Select(ZooStateQuery.getInventory)
  animals$: Observable<Animal[]>;

  constructor(private store: Store) {
    // TODO: Remove, for debug/demo only
    // this.animals$.subscribe((test) => console.log('Changed detected', test));
  }

  addAnimal() {
    const randAnimal = this.getRandomAnimal();
    this.store.dispatch(new Zoo.InsertAnimal(randAnimal));
  }

  setTitle() {
    // Note: Reruns selector logic
    const currentTitle = this.store.selectSnapshot(ZooStateQuery.getZooTitle);
    const options = ['Kansas City', 'San Diego', 'Austin', 'Pheonix'];
    let newOption = currentTitle;
    while (newOption === currentTitle) {
      newOption = options[getRandomInt(options.length)];
    }
    this.store.dispatch(new Zoo.SetTitle(newOption));
  }

  resetState() {
    // https://github.com/ng-turkey/ngxs-reset-plugin
    this.store.dispatch(new StateReset(ZooState));
  }

  editAnimal(animal: Animal) {
    this.store.dispatch(new Zoo.ModAnimal(animal));
  }

  private getRandomAnimal(): Animal {
    const randIndex = getRandomInt(mockAnimals.length - 1);
    return mockAnimals[randIndex];
  }
}
