import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MultiSelectModule } from 'primeng/multiselect';
import { MainStore } from "../store/main.store";

@Component({
	selector: 'app-exhibition-info-menu-ui',
	imports: [
		FormsModule,
		MultiSelectModule
	],
	templateUrl: './exhibition-info-menu-ui.html',
	styleUrl: './exhibition-info-menu-ui.css',
})
export class ExhibitionInfoMenuUi {
	MainStore = inject(MainStore)
}
