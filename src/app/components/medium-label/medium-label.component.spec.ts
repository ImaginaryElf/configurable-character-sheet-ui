import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumLabelComponent } from './medium-label.component';

describe('MediumLabelComponent', () => {
  let component: MediumLabelComponent;
  let fixture: ComponentFixture<MediumLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediumLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediumLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
