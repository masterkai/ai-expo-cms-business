import { signalStore, withState } from "@ngrx/signals";
import { initialCompanyDataReviewSlice } from "./company-data-review.slice";

export const CompanyDataReviewStore = signalStore(
	withState(initialCompanyDataReviewSlice)
)