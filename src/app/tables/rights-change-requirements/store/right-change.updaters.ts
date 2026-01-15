import { RightChangeSlice } from "./right-change.slice";
import { PartialStateUpdater } from "@ngrx/signals";

export function setIsDialogVisible(visible: boolean): PartialStateUpdater<RightChangeSlice> {
	return _ => ({ isDialog_rightChange_Visible: visible });
}

export function setRightChangeMode(mode: boolean): PartialStateUpdater<RightChangeSlice> {
	return _ => ({ right_change_mode: mode })
}

export function setCurrentCompID(compID: string | null): PartialStateUpdater<RightChangeSlice> {
	return _ => ({ current_compID: compID });
}

export function setEmpno(empno: string): PartialStateUpdater<RightChangeSlice> {
	return _ => ({ empno });
}

export function setDepartID(departid: string): PartialStateUpdater<RightChangeSlice> {
	return _ => ({ departid });
}