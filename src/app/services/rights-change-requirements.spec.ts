import { TestBed } from '@angular/core/testing';

import { RightsChangeRequirements } from './rights-change-requirements';

describe('RightsChangeRequirements', () => {
  let service: RightsChangeRequirements;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightsChangeRequirements);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
