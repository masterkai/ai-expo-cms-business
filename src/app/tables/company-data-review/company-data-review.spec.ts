import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDataReview } from './company-data-review';

describe('CompanyDataReview', () => {
	let component: CompanyDataReview;
	let fixture: ComponentFixture<CompanyDataReview>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ CompanyDataReview ]
		})
			.compileComponents();

		fixture = TestBed.createComponent(CompanyDataReview);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
