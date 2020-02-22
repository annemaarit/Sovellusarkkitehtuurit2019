import { TestBed } from '@angular/core/testing';

import { UutislistaService } from './uutislista.service';

describe('UutislistaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UutislistaService = TestBed.get(UutislistaService);
    expect(service).toBeTruthy();
  });
});
