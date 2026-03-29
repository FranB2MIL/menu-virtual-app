import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestaurantPage } from './edit-restaurant-page';

describe('EditRestaurantPage', () => {
  let component: EditRestaurantPage;
  let fixture: ComponentFixture<EditRestaurantPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRestaurantPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRestaurantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
