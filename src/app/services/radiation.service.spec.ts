import { TestBed } from '@angular/core/testing';

import { RadiationService } from './radiation.service';

describe('RadiationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RadiationService = TestBed.get(RadiationService);
    expect(service).toBeTruthy();
  });
});
