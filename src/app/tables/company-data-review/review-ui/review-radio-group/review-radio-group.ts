import { Component, inject, input, signal } from '@angular/core';
import { RadioButton } from "primeng/radiobutton";
import { FormsModule } from "@angular/forms";
import { toObservable } from "@angular/core/rxjs-interop";
import { CompanyReviewAction, CompanyUpdateReviewService } from "../../../../services/company-update-review.service";
import { MessageService } from "primeng/api";
import { QueryClient } from "@tanstack/angular-query-experimental";
import { CACHE_KEY_COMPANY_HISTORY_REVIEW_LIST } from "../../../../const";

@Component({
	selector: 'app-review-radio-group',
	imports: [
		RadioButton,
		FormsModule
	],
	templateUrl: './review-radio-group.html',
	styleUrl: './review-radio-group.css',
	standalone: true
})
export class ReviewRadioGroup {
	path = input.required<string>()
	compID = input.required<string>()
	review = signal<ReviewOption>('Approve');
	messageService = inject(MessageService)
	reviewService = inject(CompanyUpdateReviewService)
	queryClient = inject(QueryClient)

	constructor() {
		let isFirstEmit = true;

		toObservable(this.review).subscribe({
			next: (value) => {
				console.log('Review option changed to:', value);
				const suppressNotifications = isFirstEmit && value === 'Approve';
				isFirstEmit = false;

				const data: CompanyReviewAction = {
					compID: this.compID(),
					reviews: [{
						path: this.path(),
						result: value,
						comment: ''
					}]
				}

				this.reviewService.setReview(data).subscribe({
					next: (res) => {
						if (!suppressNotifications) {
							if (res.status === 'success') {
								this.messageService.add({
									severity: 'success',
									summary: 'Success',
									detail: `Review for ${this.path()} set to ${value}.${res.message ? ' ' + res.message : ''}`
								});
							} else {
								this.messageService.add({
									severity: 'error',
									summary: 'Error',
									detail: `Failed to set review for ${this.path()}.${res.message ? ' ' + res.message : ''}`
								});
							}
						}

						if (res.status === 'success') {
							this.queryClient.invalidateQueries({
								queryKey: CACHE_KEY_COMPANY_HISTORY_REVIEW_LIST
							});
						}

						console.log('Review set successfully:', data);
					},
					error: (err) => {
						if (!suppressNotifications) {
							this.messageService.add({
								severity: 'error',
								summary: 'Error',
								detail: `Failed to set review for ${this.path()}.${err.message ? ' ' + err.message : ''}`
							});
						}
						console.error('Error setting review:', err);
					}
				})


			}
		})
	}

	setReview(option: ReviewOption) {
		this.review.set(option);
	}
}

type ReviewOption = 'Approve' | 'Reject';