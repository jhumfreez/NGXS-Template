import { Component, VERSION } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { StateReset } from 'ngxs-reset-plugin';
import { Observable } from 'rxjs';
import { Animal } from './models/models';
import { AddAnimal } from './store/zoo.actions';
import { ZooState } from './store/zoo.state';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Select(ZooState.getAnimal)
  animals$: Observable<Animal[]>;

  name = 'Angular ' + VERSION.major;

  constructor(private store: Store) {}

  addAnimal() {
    // this.store.dispatch(new AddAnimal())
  }

  resetState() {
    // https://github.com/ng-turkey/ngxs-reset-plugin
    this.store.dispatch(new StateReset(ZooState));
  }
}
