import { CompanyDataReviewSlice } from "./company-data-review.slice";
import { PartialStateUpdater } from "@ngrx/signals";
import { CompanyUpdatePayload, HistoryReviewItem } from "../../../services/company-update-review.service";

export function setIsDialogVisible(visible: boolean): PartialStateUpdater<CompanyDataReviewSlice> {
	return _ => ({ isDialog_dataReview_Visible: visible });
}

export function setCurrentReview(review: CompanyDataReviewSlice["current_review"]): PartialStateUpdater<CompanyDataReviewSlice> {
	return _ => ({ current_review: review });
}

export function resetCurrentReview(): PartialStateUpdater<CompanyDataReviewSlice> {
	return _ => ({
		current_review: null
	});
}

export function setCurrentReviewDATA(data: CompanyUpdatePayload[]): PartialStateUpdater<CompanyDataReviewSlice> {
	return _ => ({
		current_review_data: data
	})
}

export function resetCurrentReviewDATA(): PartialStateUpdater<CompanyDataReviewSlice> {
	return _ => ({
		current_review_data: null
	})
}

export function setHistoryReviewDATA(data: HistoryReviewItem[]): PartialStateUpdater<CompanyDataReviewSlice> {
	return _ => ({
		history_review_data: data
	})
}