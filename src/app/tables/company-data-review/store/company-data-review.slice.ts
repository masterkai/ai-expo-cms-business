import { CompanyUpdatePayload } from '../../../services/company-update-review.service';

export interface CompanyDataReviewSlice {
	isDialog_dataReview_Visible: boolean;
	current_review: CompanyUpdatePayload | null;
}

export const initialCompanyDataReviewSlice: CompanyDataReviewSlice = {
	isDialog_dataReview_Visible: false,
	current_review: null,
};