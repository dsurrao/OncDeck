import { TestBed } from '@angular/core/testing';

import { SurgeryService } from './surgery.service';

describe('SurgeryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurgeryService = TestBed.get(SurgeryService);
    expect(service).toBeTruthy();
  });
});
