import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuItem } from './restaurant-menu-item';

describe('RestaurantMenuItem', () => {
  let component: RestaurantMenuItem;
  let fixture: ComponentFixture<RestaurantMenuItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantMenuItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantMenuItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
