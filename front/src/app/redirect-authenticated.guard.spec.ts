import { TestBed, async, inject } from '@angular/core/testing';

import { RedirectAuthenticatedGuard } from './redirect-authenticated.guard';

describe('RedirectAuthenticatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectAuthenticatedGuard]
    });
  });

  it('should ...', inject([RedirectAuthenticatedGuard], (guard: RedirectAuthenticatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
