import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medium-label',
  templateUrl: './medium-label.component.html',
  styleUrls: ['./medium-label.component.scss'],
})
export class MediumLabelComponent {
  @Input() layout!: any;

  constructor() {}
}
