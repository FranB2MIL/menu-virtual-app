import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { onlyPublicGuard } from './only-public-guard';

describe('onlyPublicGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => onlyPublicGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
