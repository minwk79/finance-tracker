import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeBarComponent } from './gauge-bar.component';

describe('GaugeBarComponent', () => {
  let component: GaugeBarComponent;
  let fixture: ComponentFixture<GaugeBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugeBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaugeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
