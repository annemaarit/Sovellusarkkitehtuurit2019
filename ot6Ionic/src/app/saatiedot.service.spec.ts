import { TestBed } from '@angular/core/testing';

import { SaatiedotService } from './saatiedot.service';

describe('SaatiedotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaatiedotService = TestBed.get(SaatiedotService);
    expect(service).toBeTruthy();
  });
});
