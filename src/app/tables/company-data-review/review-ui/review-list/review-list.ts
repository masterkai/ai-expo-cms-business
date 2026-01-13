import { Component, input } from '@angular/core';
import { TableModule } from "primeng/table";
import { HistoryReviewItem } from "../../../../services/company-update-review.service";

@Component({
	selector: 'app-review-list',
	imports: [
		TableModule
	],
	templateUrl: './review-list.html',
	styleUrl: './review-list.css',
})
export class ReviewList {
	data = input.required<HistoryReviewItem[]>();
}
