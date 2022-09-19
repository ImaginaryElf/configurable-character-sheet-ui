import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-large-label',
  templateUrl: './large-label.component.html',
  styleUrls: ['./large-label.component.scss'],
})
export class LargeLabelComponent {
  @Input() layout!: any;

  constructor() {}
}
