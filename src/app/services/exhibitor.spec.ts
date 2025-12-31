import { TestBed } from '@angular/core/testing';

import { Exhibitor } from './exhibitor';

describe('Exhibitor', () => {
  let service: Exhibitor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Exhibitor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
