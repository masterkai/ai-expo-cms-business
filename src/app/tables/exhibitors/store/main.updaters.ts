import { PartialStateUpdater } from "@ngrx/signals";
import { Exhibition_rights, MainSlice, Selected_Exhibition_rights } from "./main.slice";

export function setExhibitionRights(rights: Exhibition_rights): PartialStateUpdater<MainSlice> {
	return _ => ({ exhibition_rights: rights });
}

export function setSelectedExhibitionRights(partialSelectedRights: Partial<Selected_Exhibition_rights>): PartialStateUpdater<MainSlice> {
	return state => ({
		selected_exhibition_right: {
			...state.selected_exhibition_right,
			...partialSelectedRights
		}
	});
}

export function setIsDialogVisible(visible: boolean): PartialStateUpdater<MainSlice> {
	return _ => ({ isDialog_createLink_Visible: visible });
}

export function setCurrentCompany(company: MainSlice["current_company"]): PartialStateUpdater<MainSlice> {
	return _ => ({ current_company: company });
}

export function resetSelectedExhibitionRights(): PartialStateUpdater<MainSlice> {
	return _ => ({
		selected_exhibition_right: {
			lecture: [],
			optional: [],
			promotion: [],
			booth: [],
			stage: [],
		}
	});
}

export function setCurrentCompID(compID: string | null): PartialStateUpdater<MainSlice> {
	return _ => ({ current_compID: compID });
}

export function setEmpno(empno: string): PartialStateUpdater<MainSlice> {
	return _ => ({ empno });
}

export function setDepartID(departid: string): PartialStateUpdater<MainSlice> {
	return _ => ({ departid });
}