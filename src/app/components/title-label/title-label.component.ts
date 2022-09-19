import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-label',
  templateUrl: './title-label.component.html',
  styleUrls: ['./title-label.component.scss'],
})
export class TitleLabelComponent {
  @Input() layout!: any;

  constructor() {}
}
