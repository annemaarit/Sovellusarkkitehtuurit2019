import { TestBed } from '@angular/core/testing';

import { KuvapalvelutService } from './kuvapalvelut.service';

describe('KuvapalvelutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KuvapalvelutService = TestBed.get(KuvapalvelutService);
    expect(service).toBeTruthy();
  });
});
