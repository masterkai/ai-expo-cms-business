import { TestBed } from '@angular/core/testing';

import { ExhibitionRightsService } from './exhibition-rights-service';

describe('ExhibitionRightsService', () => {
  let service: ExhibitionRightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExhibitionRightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
