import { RightChangeSlice } from "./right-change.slice";
import { PartialStateUpdater } from "@ngrx/signals";

export function setIsDialogVisible(visible: boolean): PartialStateUpdater<RightChangeSlice> {
	return _ => ({ isDialog_rightChange_Visible: visible });
}