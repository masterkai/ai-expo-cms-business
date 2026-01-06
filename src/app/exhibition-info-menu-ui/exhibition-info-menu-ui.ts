import { Component, inject } from '@angular/core';
import {
	Add_to_cart_dropdown_menu,
	Exhibition_booth_drop_down_menu,
	Future_Stage_Agenda_Drop_down_Menu,
	Media_promotion_dropdown_menu,
	Select_item,
	Sponsorship_benefits_drop_down_menu,
	Unsure_of_the_lecture_agenda_drop_down_menu
} from "../../mock-data/data";
import { FormsModule } from "@angular/forms";
import { Select } from "primeng/select";
import { MultiSelectModule } from 'primeng/multiselect';
import { MainStore } from "../store/main.store";

@Component({
	selector: 'app-exhibition-info-menu-ui',
	imports: [
		FormsModule,
		Select,
		MultiSelectModule
	],
	templateUrl: './exhibition-info-menu-ui.html',
	styleUrl: './exhibition-info-menu-ui.css',
})
export class ExhibitionInfoMenuUi {
	MainStore = inject(MainStore)
	Unsure_of_the_lecture_agenda_drop_down_menu = Unsure_of_the_lecture_agenda_drop_down_menu;
	Future_Stage_Agenda_Drop_down_Menu = Future_Stage_Agenda_Drop_down_Menu;
	Sponsorship_benefits_drop_down_menu = Sponsorship_benefits_drop_down_menu;
	Exhibition_booth_drop_down_menu = Exhibition_booth_drop_down_menu
	Media_promotion_dropdown_menu = Media_promotion_dropdown_menu
	Add_to_cart_dropdown_menu = Add_to_cart_dropdown_menu

	selected_Unsure_of_the_lecture_agenda: Select_item | undefined
	selected_Future_Stage_Agenda: Select_item | undefined
	selected_Sponsorship_benefit: Select_item | undefined
	selected_Exhibition_booth: Select_item | undefined
	selected_Media_promotions: Select_item[] = []
	selected_Add_to_carts: Select_item[] = []
}
