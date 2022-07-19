import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoolInputComponent } from './bool-input.component';

describe('BoolInputComponent', () => {
  let component: BoolInputComponent;
  let fixture: ComponentFixture<BoolInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoolInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoolInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
