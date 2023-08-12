import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityInputComponentComponent } from './city-input-component.component';

describe('CityInputComponentComponent', () => {
  let component: CityInputComponentComponent;
  let fixture: ComponentFixture<CityInputComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityInputComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
