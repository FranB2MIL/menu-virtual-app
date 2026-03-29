import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogedPaged } from './loged-paged';

describe('LogedPaged', () => {
  let component: LogedPaged;
  let fixture: ComponentFixture<LogedPaged>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogedPaged]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogedPaged);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
