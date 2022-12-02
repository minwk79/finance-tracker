import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingsPageComponent } from './spendings-page.component';

describe('SpendingsPageComponent', () => {
  let component: SpendingsPageComponent;
  let fixture: ComponentFixture<SpendingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
