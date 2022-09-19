import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-label',
  templateUrl: './small-label.component.html',
  styleUrls: ['./small-label.component.scss'],
})
export class SmallLabelComponent {
  @Input() layout!: any;

  constructor() {}
}
