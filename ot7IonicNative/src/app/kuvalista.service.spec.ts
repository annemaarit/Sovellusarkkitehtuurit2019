import { TestBed } from '@angular/core/testing';

import { KuvalistaService } from './kuvalista.service';

describe('KuvalistaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KuvalistaService = TestBed.get(KuvalistaService);
    expect(service).toBeTruthy();
  });
});
