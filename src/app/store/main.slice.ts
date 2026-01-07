import { Select_item } from "../../mock-data/data";

export interface MainSlice {
	isDialogVisible: boolean;
	exhibition_rights: Exhibition_rights;
	selected_exhibition_right: Selected_Exhibition_rights;
}

export interface Exhibition_rights {
	unsure_of_the_lecture_agenda_drop_down_menu: Select_item[];
	sponsorship_benefits_drop_down_menu: Select_item[];
	add_to_cart_dropdown_menu: Select_item[];
	media_promotion_dropdown_menu: Select_item[];
	exhibition_booth_drop_down_menu: Select_item[];
	future_Stage_Agenda_Drop_down_Menu: Select_item[];
}

export interface Selected_Exhibition_rights {
	unsure_of_the_lecture_agenda: Select_item | undefined;
	sponsorship_benefits: Select_item | undefined;
	add_to_cart: Select_item[];
	media_promotion: Select_item[];
	exhibition_booth: Select_item | undefined;
	future_Stage_Agenda: Select_item | undefined;
}

export const initialMainSlice: MainSlice = {
	isDialogVisible: false,
	exhibition_rights: {
		unsure_of_the_lecture_agenda_drop_down_menu: [],
		sponsorship_benefits_drop_down_menu: [],
		add_to_cart_dropdown_menu: [],
		media_promotion_dropdown_menu: [],
		exhibition_booth_drop_down_menu: [],
		future_Stage_Agenda_Drop_down_Menu: [],
	},
	selected_exhibition_right: {
		unsure_of_the_lecture_agenda: undefined,
		sponsorship_benefits: undefined,
		add_to_cart: [],
		media_promotion: [],
		exhibition_booth: undefined,
		future_Stage_Agenda: undefined,
	},
};