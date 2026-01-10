import { Component, inject, signal } from '@angular/core';
import { CompanyUpdateReviewService, DocumentUpdatePendingReview } from "../../services/company-update-review.service";
import { Button } from "primeng/button";
import { TableModule } from "primeng/table";
import { DatePipe } from "@angular/common";

@Component({
	selector: 'app-company-data-review',
	imports: [
		Button,
		TableModule,
		DatePipe
	],
	templateUrl: './company-data-review.html',
	styleUrl: './company-data-review.css',
})
export class CompanyDataReview {
	documentUpdatesPendingReviewService = inject(CompanyUpdateReviewService)
	documentUpdatesPendingReview = signal<DocumentUpdatePendingReview[]>([])

	ngOnInit() {
		this.documentUpdatesPendingReviewService.getDocumentUpdatesPendingReview().then(data => {
			this.documentUpdatesPendingReview.set(data)
		})
	}

	protected handleChange(item: any) {
		console.log('Change clicked for item:', item);
		// Implement change logic here
	}
}
