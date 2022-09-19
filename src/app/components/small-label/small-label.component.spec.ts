import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallLabelComponent } from './small-label.component';

describe('SmallLabelComponent', () => {
  let component: SmallLabelComponent;
  let fixture: ComponentFixture<SmallLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmallLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
