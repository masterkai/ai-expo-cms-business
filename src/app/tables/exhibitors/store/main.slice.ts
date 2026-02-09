import { CompanyUpdatePayload } from '../../../services/company-update-review.service';
import { Option, Right } from '../../../services/exhibition-rights-service';

export interface MainSlice {
  current_company: Company | null;
  selectedSponsorShips: GenericOption | null;
  current_compID: string | null;
  isDialog_createLink_Visible: boolean;
  selectedBoothStyle: BoothStyles | null;
  settled_girdNum: number | null;
  empno: string;
  departid: string;
  booth_style: string;
  grid_num: string;
  exhibition_rights: Exhibition_rights;
  selected_exhibition_right: Selected_Exhibition_rights;
  current_review_data: CompanyUpdatePayload[] | null;
}

export interface BoothStyles {
  name: string;
  code: string;
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
  lecture: Option[];
  optional: Option[];
  promotion: Option[];
  booth: Option[];
  stage: Option[];
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
  selectedSponsorShips: null,
  settled_girdNum: null,
  selectedBoothStyle: null,
  current_company: null,
  current_compID: null,
  isDialog_createLink_Visible: false,
  empno: '',
  departid: '',
  booth_style: '',
  grid_num: '',
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
  current_review_data: null,
};

export interface GenericOption {
  name: string;
  code: string;
}
