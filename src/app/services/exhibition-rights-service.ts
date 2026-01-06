import { Injectable } from '@angular/core';
import {
	Add_to_cart_dropdown_menu,
	Exhibition_booth_drop_down_menu,
	Future_Stage_Agenda_Drop_down_Menu,
	Media_promotion_dropdown_menu,
	Sponsorship_benefits_drop_down_menu,
	Unsure_of_the_lecture_agenda_drop_down_menu
} from "../../mock-data/data";
import { Exhibition_rights } from "../store/main.slice";

@Injectable({
	providedIn: 'root',
})
export class ExhibitionRightsService {
	Unsure_of_the_lecture_agenda_drop_down_menu = Unsure_of_the_lecture_agenda_drop_down_menu;
	Future_Stage_Agenda_Drop_down_Menu = Future_Stage_Agenda_Drop_down_Menu;
	Sponsorship_benefits_drop_down_menu = Sponsorship_benefits_drop_down_menu;
	Exhibition_booth_drop_down_menu = Exhibition_booth_drop_down_menu
	Media_promotion_dropdown_menu = Media_promotion_dropdown_menu
	Add_to_cart_dropdown_menu = Add_to_cart_dropdown_menu;

	async getExhibitionRights(): Promise<Exhibition_rights> {
		return Promise.resolve({
			unsure_of_the_lecture_agenda_drop_down_menu: this.Unsure_of_the_lecture_agenda_drop_down_menu,
			future_Stage_Agenda_Drop_down_Menu: this.Future_Stage_Agenda_Drop_down_Menu,
			sponsorship_benefits_drop_down_menu: this.Sponsorship_benefits_drop_down_menu,
			exhibition_booth_drop_down_menu: this.Exhibition_booth_drop_down_menu,
			media_promotion_dropdown_menu: this.Media_promotion_dropdown_menu,
			add_to_cart_dropdown_menu: this.Add_to_cart_dropdown_menu
		});
	};
}
