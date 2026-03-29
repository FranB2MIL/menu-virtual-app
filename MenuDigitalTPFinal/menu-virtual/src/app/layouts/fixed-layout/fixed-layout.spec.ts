import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedLayout } from './fixed-layout';

describe('FixedLayout', () => {
  let component: FixedLayout;
  let fixture: ComponentFixture<FixedLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
