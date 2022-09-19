import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeLabelComponent } from './large-label.component';

describe('LargeLabelComponent', () => {
  let component: LargeLabelComponent;
  let fixture: ComponentFixture<LargeLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LargeLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LargeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
