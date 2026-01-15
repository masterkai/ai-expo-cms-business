export interface RightChangeSlice {
	isDialog_rightChange_Visible: boolean;
	current_compID: string | null;
	right_change_mode: boolean;
	empno: string;
	departid: string;
}

export const initialRightChangeSlice: RightChangeSlice = {
	empno: '',
	departid: '',
	current_compID: null,
	isDialog_rightChange_Visible: false,
	right_change_mode: false,
};