import { Animal, Habitat } from '../models/models';

// Note: NGXS suggests this structure, however namespaces are dissallowed by default in typescript-eslint
// https://www.typescriptlang.org/docs/handbook/namespaces.html
// https://typescript-eslint.io/rules/no-namespace/
// - Consider eslint configuration "recommended"
// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
// - idk what the best approach is to balance bundle sizes and name pollution. So here's some context:
// https://stackoverflow.com/questions/54923338/javascript-typescript-whats-the-difference-between-exporting-single-functions
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

  export class SetTitle {
    static readonly type = '[Zoo] Assign Title of Zoo';
    constructor(public title: string) {}
  }
}
