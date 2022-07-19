import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent {
  @Input() parentForm!: FormGroup;
  @Input() layout!: any;
  @Input() controlName!: string;

  constructor() {}
}
