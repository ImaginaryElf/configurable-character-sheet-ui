import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss']
})
export class TextareaInputComponent {
  @Input() parentForm!: FormGroup;
  @Input() layout!: any;
  @Input() controlName!: string;

  constructor() { }
}
