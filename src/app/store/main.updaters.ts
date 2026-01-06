import { PartialStateUpdater } from "@ngrx/signals";
import { MainSlice } from "./main.slice";

export function setExhibitionRights(rights: Partial<MainSlice>['exhibition_rights']): PartialStateUpdater<MainSlice> {
	return _ => ({ exhibition_rights: rights });
}