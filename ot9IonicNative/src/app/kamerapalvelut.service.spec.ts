import { TestBed } from '@angular/core/testing';

import { KamerapalvelutService } from './kamerapalvelut.service';

describe('KamerapalvelutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KamerapalvelutService = TestBed.get(KamerapalvelutService);
    expect(service).toBeTruthy();
  });
});
