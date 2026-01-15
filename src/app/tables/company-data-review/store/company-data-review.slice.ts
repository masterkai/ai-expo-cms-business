import {
	CompanyUpdatePayload,
	CompanyUpdateReviewItem,
	HistoryReviewItem
} from '../../../services/company-update-review.service';

export interface CompanyDataReviewSlice {
	empno: string;
	departid: string;
	history_review_data: HistoryReviewItem[] | null;
	isDialog_dataReview_Visible: boolean;
	current_review: CompanyUpdateReviewItem | null;
	current_review_data: CompanyUpdatePayload[] | null;
}

export const initialCompanyDataReviewSlice: CompanyDataReviewSlice = {
	empno: '',
	departid: '',
	history_review_data: null,
	isDialog_dataReview_Visible: false,
	current_review: null,
	current_review_data: null
};