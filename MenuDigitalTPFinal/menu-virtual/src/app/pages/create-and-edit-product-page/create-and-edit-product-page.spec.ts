import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAndEditProductPage } from './create-and-edit-product-page';

describe('CreateAndEditProductPage', () => {
  let component: CreateAndEditProductPage;
  let fixture: ComponentFixture<CreateAndEditProductPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAndEditProductPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAndEditProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
