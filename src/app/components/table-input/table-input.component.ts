import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table-input',
  templateUrl: './table-input.component.html',
  styleUrls: ['./table-input.component.scss'],
})
export class TableInputComponent {
  @Input() parentForm!: FormArray;
  @Input() layout!: any;

  constructor() {}

  getDisplayColumns() {
    const columnRefs = Object.values(this.layout.tableMappings);
    columnRefs.push('action');
    return columnRefs as string[];
  }

  removeItem(i: number) {
    this.parentForm.removeAt(i);
  }

  addItem() {
    const columnRefs = Object.values(this.layout.tableMappings);
    let formGroup = new FormGroup({});
    columnRefs.forEach((cr: any) => {
      formGroup.addControl(cr, new FormControl(''));
    });
    this.parentForm.push(formGroup);
  }
}
