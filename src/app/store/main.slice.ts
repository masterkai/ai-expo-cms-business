import { Option, Right } from '../services/exhibition-rights-service'

export interface MainSlice {
	isDialog_createLink_Visible: boolean;
	isDialog_rightChange_Visible: boolean;
	isDialog_dataReview_Visible: boolean;
	exhibition_rights: Exhibition_rights;
	selected_exhibition_right: Selected_Exhibition_rights;
}

export interface Exhibition_rights {
	sponsorship_benefits?: Right[];
	lecture: Option[];
	optional: Option[];
	promotion: Option[];
	booth: Option[];
	stage: Option[];
}

export interface Selected_Exhibition_rights {
	lecture: Option [];
	optional: Option[];
	promotion: Option[];
	booth: Option[];
	stage: Option [];
}

// export interface Company extends Exhibitor, Selected_Exhibition_rights {
// }
export type Company = Exhibitor & Selected_Exhibition_rights;

export interface Exhibitor {
	createdate: string;
	company_name: string;
	unified_business_no: string;
	link: string;
}

export const initialMainSlice: MainSlice = {
	isDialog_createLink_Visible: false,
	isDialog_rightChange_Visible: false,
	isDialog_dataReview_Visible: false,
	exhibition_rights: {
		sponsorship_benefits: [],
		lecture: [],
		optional: [],
		promotion: [],
		booth: [],
		stage: [],
	},
	selected_exhibition_right: {
		lecture: [],
		optional: [],
		promotion: [],
		booth: [],
		stage: [],
	},
};