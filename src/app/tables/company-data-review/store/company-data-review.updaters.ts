import { CompanyDataReviewSlice } from "./company-data-review.slice";
import { PartialStateUpdater } from "@ngrx/signals";

export function setIsDialogVisible(visible: boolean): PartialStateUpdater<CompanyDataReviewSlice> {
	return _ => ({ isDialog_dataReview_Visible: visible });
}