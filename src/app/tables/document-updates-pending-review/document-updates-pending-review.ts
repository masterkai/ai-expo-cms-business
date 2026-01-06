import { Component, inject, signal } from '@angular/core';
import {
	DocumentUpdatePendingReview,
	DocumentUpdatesPendingReviewService
} from "../../services/document-updates-pending-review.service";
import { Button } from "primeng/button";
import { TableModule } from "primeng/table";
import { DatePipe } from "@angular/common";

@Component({
	selector: 'app-document-updates-pending-review',
	imports: [
		Button,
		TableModule,
		DatePipe
	],
	templateUrl: './document-updates-pending-review.html',
	styleUrl: './document-updates-pending-review.css',
})
export class DocumentUpdatesPendingReview {
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
