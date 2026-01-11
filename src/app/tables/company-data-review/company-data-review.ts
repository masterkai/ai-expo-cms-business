import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { Button } from "primeng/button";
import { TableModule } from "primeng/table";
import { CompanyDataReviewStore } from "./store/company-data-review.store";
import { CommonDialog } from "../../shared/components/common-dialog/common-dialog";

@Component({
	selector: 'app-company-data-review',
	imports: [
		Button,
		TableModule,
		CommonDialog,
	],
	templateUrl: './company-data-review.html',
	styleUrl: './company-data-review.css',
})
export class CompanyDataReview implements AfterViewInit {
	companyDataReviewStore = inject(CompanyDataReviewStore)

	dialog = viewChild(CommonDialog)

	ngAfterViewInit() {
		this.dialog()?.visible$.subscribe({
			next: (value) => {
				console.log('Dialog visible changed:', value);
				// if dialog is closed, clear current company selection
				// and reset selected exhibition rights
				// and current company ID in the store
				if (!value) {
					console.log('Dialog closed, resetting current company selection.');
				}

				this.companyDataReviewStore.setIsDialogVisible(value);
			}
		})
	}

	protected handleChange(item: any) {
		this.companyDataReviewStore.setIsDialogVisible(true);
		console.log('Change clicked for item:', item);
		// Implement change logic here
	}
}
