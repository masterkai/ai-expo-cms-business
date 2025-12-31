import { TestBed } from '@angular/core/testing';

import { DocumentUpdatesPendingReview } from './document-updates-pending-review';

describe('DocumentUpdatesPendingReview', () => {
  let service: DocumentUpdatesPendingReview;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentUpdatesPendingReview);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
