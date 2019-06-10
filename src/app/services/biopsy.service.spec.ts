import { TestBed } from '@angular/core/testing';

import { BiopsyService } from './biopsy.service';

describe('BiopsyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BiopsyService = TestBed.get(BiopsyService);
    expect(service).toBeTruthy();
  });
});
