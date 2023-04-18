import { Animal, Habitat } from "../models/models";

export namespace Zoo {
  export class AddAnimal {
    static readonly type = '[Zoo] Add Animal';
    constructor(public animal: Animal) {}
  }

  export class ModAnimal {
    // Note: type is identifier for action. All action types must be unique.
    static readonly type = '[Zoo] Modify Animal';
    constructor(public animal: Animal) {}
  }

  export class AddLocation {
    static readonly type = '[Zoo] Add Animal Location';
    constructor(public animalId: number, public location: Habitat) {}
  }
}
