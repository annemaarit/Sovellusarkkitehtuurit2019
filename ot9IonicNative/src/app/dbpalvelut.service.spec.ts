import { TestBed } from '@angular/core/testing';

import { DbpalvelutService } from './dbpalvelut.service';

describe('DbpalvelutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbpalvelutService = TestBed.get(DbpalvelutService);
    expect(service).toBeTruthy();
  });
});
