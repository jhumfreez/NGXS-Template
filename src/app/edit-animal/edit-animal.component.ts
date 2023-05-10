import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Animal } from '../models/models';

// Form type definitions
type AnimalMutable = Pick<Animal, 'name'>;
type AnimalFormGroup = {
  [Property in keyof AnimalMutable]: FormControl<AnimalMutable[Property]>;
};

@Component({
  selector: 'app-edit-animal',
  template: `
    <button [ngClass]="{'btn_toggle--engaged': visible}" (click)="toggleForm()">Toggle Editor</button>
    <form *ngIf="visible" (submit)="notifyEdit()" [formGroup]="editForm">
      <label for="animalName">Name:</label>
      <input id="animalName" formControlName="name" maxLength="30">
          
      <button type="submit" [disabled]="editForm.pristine||editForm.invalid">Update</button>
    </form>
  `,
})
export class EditAnimalComponent implements OnInit {
  @Input('animal')
  animal: Animal = null;

  // @Input('visible')
  visible = false;

  @Output()
  patch: EventEmitter<Animal>;

  get disabled() {
    return this.visible;
  }

  editForm: FormGroup<AnimalFormGroup>;

  constructor(private fb: FormBuilder) {
    this.patch = new EventEmitter();
  }

  ngOnInit() {
    this.editForm = this.fb.group<AnimalFormGroup>({
      name: this.fb.control(this.animal.name, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
    this.editForm.patchValue({ name: this.animal.name });
  }

  notifyEdit() {
    this.patch.emit({
      ...this.animal,
      name: this.editForm.controls.name.value,
    });
  }

  toggleForm() {
    this.visible = !this.visible;
    this.editForm.reset();
  }
}
