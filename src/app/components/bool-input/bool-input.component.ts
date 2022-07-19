import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bool-input',
  templateUrl: './bool-input.component.html',
  styleUrls: ['./bool-input.component.scss'],
})
export class BoolInputComponent {
  @Input() parentForm!: FormGroup;
  @Input() layout!: any;
  @Input() controlName!: string;

  constructor() {}
}
