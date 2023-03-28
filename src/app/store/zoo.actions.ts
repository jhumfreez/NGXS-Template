import { Animal, Habitat } from "../models/models";

export namespace Zoo {
  export class AddAnimal {
    static readonly type = '[Zoo] Add Animal';
    constructor(public animal: Animal) {}
  }

  export class AddLocation {
    static readonly type = '[Zoo] Add Animal Location';
    constructor(public animalId: number, public location: Habitat) {}
  }
}
