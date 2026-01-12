import { Component, inject, signal } from '@angular/core';
import { CompanyDataReviewStore } from "../store/company-data-review.store";
import { Tag } from "primeng/tag";
import { Tooltip } from "primeng/tooltip";
import { Divider } from "primeng/divider";
import { Card } from "../../../shared/components/card/card";
import { ProgressSpinner } from "primeng/progressspinner";
import { FormsModule } from '@angular/forms';
import { ReviewRadioGroup } from "./review-radio-group/review-radio-group";
import { Dialog } from "primeng/dialog";
import { Button } from "primeng/button";

@Component({
	selector: 'app-review-ui',
	imports: [
		Tag,
		Tooltip,
		Divider,
		Card,
		ProgressSpinner,
		FormsModule,
		ReviewRadioGroup,
		Dialog,
		Button,
	],
	templateUrl: './review-ui.html',
	styleUrl: './review-ui.scss',
})
export class ReviewUi {
	companyDataReviewStore = inject(CompanyDataReviewStore)
	protected visible = signal(false);

	renderObjectValues(obj: any): string {
		return Object.values(obj).join('-');
	}

	renderValue(obj: any, key: string, defaultText: string = '無資料'): string {
		return obj && obj[key] ? obj[key] : defaultText;
	}

	protected toggleReviewProcessRecordDialog() {
		this.visible.update(v => !v);
	}

	protected submitReview() {
		const compID = this.companyDataReviewStore.current_review()!.compID;
		this.companyDataReviewStore.onSentReview(compID);
		this.companyDataReviewStore.setIsDialogVisible(false);
	}
}
