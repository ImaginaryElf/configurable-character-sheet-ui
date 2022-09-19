import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleLabelComponent } from './title-label.component';

describe('TitleLabelComponent', () => {
  let component: TitleLabelComponent;
  let fixture: ComponentFixture<TitleLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
