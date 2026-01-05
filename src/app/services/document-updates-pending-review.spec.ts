import { TestBed } from '@angular/core/testing';

import { DocumentUpdatesPendingReviewService } from './document-updates-pending-review.service';

describe('DocumentUpdatesPendingReview', () => {
  let service: DocumentUpdatesPendingReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentUpdatesPendingReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
