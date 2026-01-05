import { TestBed } from '@angular/core/testing';

import { RightsChangeRequirementsService } from './rights-change-requirements.service';

describe('RightsChangeRequirements', () => {
  let service: RightsChangeRequirementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightsChangeRequirementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
