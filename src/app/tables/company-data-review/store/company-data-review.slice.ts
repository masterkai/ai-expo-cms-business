import { CompanyUpdatePayload, CompanyUpdateReviewItem } from '../../../services/company-update-review.service';

export interface CompanyDataReviewSlice {
	isDialog_dataReview_Visible: boolean;
	current_review: CompanyUpdateReviewItem | null;
	current_review_data: CompanyUpdatePayload[] | null;
}

export const initialCompanyDataReviewSlice: CompanyDataReviewSlice = {
	isDialog_dataReview_Visible: false,
	current_review: null,
	current_review_data: null
};