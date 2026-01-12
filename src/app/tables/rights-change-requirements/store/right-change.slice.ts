export interface RightChangeSlice {
	isDialog_rightChange_Visible: boolean;
	current_compID: string | null;
	right_change_mode: boolean;
}

export const initialRightChangeSlice: RightChangeSlice = {
	current_compID: null,
	isDialog_rightChange_Visible: false,
	right_change_mode: false,
};