import { TestBed } from '@angular/core/testing';

import { LajipalvelutService } from './lajipalvelut.service';

describe('LajipalvelutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LajipalvelutService = TestBed.get(LajipalvelutService);
    expect(service).toBeTruthy();
  });
});
