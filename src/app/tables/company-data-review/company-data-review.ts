import { Component, inject, signal } from '@angular/core';
import {
	DocumentUpdatePendingReview,
	DocumentUpdatesPendingReviewService
} from "../../services/document-updates-pending-review.service";
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
	documentUpdatesPendingReviewService = inject(DocumentUpdatesPendingReviewService)
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
