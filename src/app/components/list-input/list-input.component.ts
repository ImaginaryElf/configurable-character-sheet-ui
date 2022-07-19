import { Component, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.scss'],
})
export class ListInputComponent {
  @Input() parentForm!: FormArray;
  @Input() layout!: any;

  constructor() {}

  addItem() {
    this.parentForm.push(new FormControl(''));
  }

  removeItem(i: number) {
    this.parentForm.removeAt(i);
  }
}
