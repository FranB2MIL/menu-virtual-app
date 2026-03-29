import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorantMenuPage } from './restorant-menu-page';

describe('RestorantMenuPage', () => {
  let component: RestorantMenuPage;
  let fixture: ComponentFixture<RestorantMenuPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestorantMenuPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestorantMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
