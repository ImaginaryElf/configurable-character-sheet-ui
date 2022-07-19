import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NullInputComponent } from './null-input.component';

describe('NullInputComponent', () => {
  let component: NullInputComponent;
  let fixture: ComponentFixture<NullInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NullInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NullInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
