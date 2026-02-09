import { PartialStateUpdater } from '@ngrx/signals';
import {
  BoothStyles,
  Exhibition_rights,
  GenericOption,
  MainSlice,
  Selected_Exhibition_rights,
} from './main.slice';
import { CompanyUpdatePayload } from '../../../services/company-update-review.service';

export function setExhibitionRights(rights: Exhibition_rights): PartialStateUpdater<MainSlice> {
  return (_) => ({ exhibition_rights: rights });
}

export function setSelectedExhibitionRights(
  partialSelectedRights: Partial<Selected_Exhibition_rights>,
): PartialStateUpdater<MainSlice> {
  return (state) => ({
    selected_exhibition_right: {
      ...state.selected_exhibition_right,
      ...partialSelectedRights,
    },
  });
}

export function setIsDialogVisible(visible: boolean): PartialStateUpdater<MainSlice> {
  return (_) => ({ isDialog_createLink_Visible: visible });
}

export function setSelectedSponsorShips(
  option: GenericOption | null,
): PartialStateUpdater<MainSlice> {
  return (_) => ({ selectedSponsorShips: option });
}

export function setCurrentCompany(
  company: MainSlice['current_company'],
): PartialStateUpdater<MainSlice> {
  return (_) => ({ current_company: company });
}

export function resetSelectedExhibitionRights(): PartialStateUpdater<MainSlice> {
  return (_) => ({
    selected_exhibition_right: {
      lecture: [],
      optional: [],
      promotion: [],
      booth: [],
      stage: [],
    },
  });
}

export function setCurrentCompID(compID: string | null): PartialStateUpdater<MainSlice> {
  return (_) => ({ current_compID: compID });
}

export function setEmpno(empno: string): PartialStateUpdater<MainSlice> {
  return (_) => ({ empno });
}

export function setDepartID(departid: string): PartialStateUpdater<MainSlice> {
  return (_) => ({ departid });
}

export function setBoothStyle(boothStyle: string): PartialStateUpdater<MainSlice> {
  return (_) => ({ booth_style: boothStyle });
}

export function setGridNumber(gridNumber: string): PartialStateUpdater<MainSlice> {
  return (_) => ({ grid_num: gridNumber });
}

export function setSelectedBoothStyle(style: BoothStyles | null): PartialStateUpdater<MainSlice> {
  return (_) => ({ selectedBoothStyle: style });
}

export function setGridNumUI(v: number | null): PartialStateUpdater<MainSlice> {
  return (_) => ({ settled_girdNum: v });
}

export function setCurrentReviewDATA(data: CompanyUpdatePayload[]): PartialStateUpdater<MainSlice> {
  return (_) => ({
    current_review_data: data,
  });
}

export function resetCurrentReviewDATA(): PartialStateUpdater<MainSlice> {
  return (_) => ({
    current_review_data: null,
  });
}
