import { PartialStateUpdater } from "@ngrx/signals";
import { Exhibition_rights, MainSlice } from "./main.slice";

export function setExhibitionRights(rights: Exhibition_rights): PartialStateUpdater<MainSlice> {
	return _ => ({ exhibition_rights: rights });
}