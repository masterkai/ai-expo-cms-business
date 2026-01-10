import { TestBed } from '@angular/core/testing';

import { CompanyUpdateReviewService } from './company-update-review.service';

describe('DocumentUpdatesPendingReview', () => {
	let service: CompanyUpdateReviewService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CompanyUpdateReviewService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
