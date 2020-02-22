import { TestBed } from '@angular/core/testing';

import { TunnuspalvelutService } from './tunnuspalvelut.service';

describe('TunnuspalvelutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TunnuspalvelutService = TestBed.get(TunnuspalvelutService);
    expect(service).toBeTruthy();
  });
});
