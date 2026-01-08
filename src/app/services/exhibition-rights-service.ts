import { Injectable } from '@angular/core';
import {
	Add_to_cart_dropdown_menu,
	Exhibition_booth_drop_down_menu,
	Future_Stage_Agenda_Drop_down_Menu,
	Media_promotion_dropdown_menu,
	Unsure_of_the_lecture_agenda_drop_down_menu
} from "../../mock-data/data";
import { Exhibition_rights } from "../store/main.slice";

@Injectable({
	providedIn: 'root',
})
export class ExhibitionRightsService {
	Unsure_of_the_lecture_agenda_drop_down_menu = Unsure_of_the_lecture_agenda_drop_down_menu;
	Future_Stage_Agenda_Drop_down_Menu = Future_Stage_Agenda_Drop_down_Menu;
	Exhibition_booth_drop_down_menu = Exhibition_booth_drop_down_menu
	Media_promotion_dropdown_menu = Media_promotion_dropdown_menu
	Add_to_cart_dropdown_menu = Add_to_cart_dropdown_menu;

	async getExhibitionRights(): Promise<Exhibition_rights> {
		return Promise.resolve({
			lecture: this.Unsure_of_the_lecture_agenda_drop_down_menu,
			stage: this.Future_Stage_Agenda_Drop_down_Menu,
			booth: this.Exhibition_booth_drop_down_menu,
			promotion: this.Media_promotion_dropdown_menu,
			optional: this.Add_to_cart_dropdown_menu
		});
	};
}
