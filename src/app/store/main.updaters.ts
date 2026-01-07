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