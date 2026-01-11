import { Component, inject, input, signal } from '@angular/core';
import { RadioButton } from "primeng/radiobutton";
import { FormsModule } from "@angular/forms";
import { toObservable } from "@angular/core/rxjs-interop";
import { CompanyReviewAction, CompanyUpdateReviewService } from "../../../../services/company-update-review.service";
import { MessageService } from "primeng/api";

@Component({
	selector: 'app-review-radio-group',
	imports: [
		RadioButton,
		FormsModule
	],
	templateUrl: './review-radio-group.html',
	styleUrl: './review-radio-group.css',
})
export class ReviewRadioGroup {
	path = input.required<string>()
	compID = input.required<string>()
	review = signal<ReviewOption>('Reject');
	messageService = inject(MessageService)
	reviewService = inject(CompanyUpdateReviewService)

	constructor() {
		toObservable(this.review).subscribe({
			next: (value) => {
				console.log('Review option changed to:', value);
				const data: CompanyReviewAction = {
					compID: this.compID(),
					reviews: [ {
						path: this.path(),
						result: value,
						comment: ''
					} ]
				}
				this.reviewService.setReview(data).subscribe({
					next: (res) => {
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
						console.log('Review set successfully:', data);
					},
					error: (err) => {
						this.messageService.add({
							severity: 'error',
							summary: 'Error',
							detail: `Failed to set review for ${this.path()}.${err.message ? ' ' + err.message : ''}`
						});
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