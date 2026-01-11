import { Component, inject } from '@angular/core';
import { Button } from "primeng/button";
import { TableModule } from "primeng/table";
import { CompanyDataReviewStore } from "./store/company-data-review.store";

@Component({
	selector: 'app-company-data-review',
	imports: [
		Button,
		TableModule,
	],
	templateUrl: './company-data-review.html',
	styleUrl: './company-data-review.css',
})
export class CompanyDataReview {
	companyDataReviewStore = inject(CompanyDataReviewStore)


	protected handleChange(item: any) {
		console.log('Change clicked for item:', item);
		// Implement change logic here
	}
}
