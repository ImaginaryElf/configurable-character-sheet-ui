import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-null-input',
  templateUrl: './null-input.component.html',
  styleUrls: ['./null-input.component.scss'],
})
export class NullInputComponent {
  @Input() layout!: any;

  constructor() {}
}
