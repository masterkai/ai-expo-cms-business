import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MultiSelectModule } from 'primeng/multiselect';
import { MainStore } from "../tables/exhibitors/store/main.store";
import { Select, SelectChangeEvent } from "primeng/select";
import { InputNumber, InputNumberInputEvent } from "primeng/inputnumber";

@Component({
	selector: 'app-exhibition-info-menu-ui',
	imports: [
		FormsModule,
		MultiSelectModule,
		Select,
		InputNumber
	],
	templateUrl: './exhibition-info-menu-ui.html',
	styleUrl: './exhibition-info-menu-ui.scss',
	standalone: true
})
export class ExhibitionInfoMenuUi {
	mainStore = inject(MainStore)
	gridNum = 1;

	onGridNumChange($event: InputNumberInputEvent) {
		this.mainStore.setGridNumber(($event.value ?? 1) + '')
	}

	protected onBoothStyleChange($event: SelectChangeEvent) {
		this.mainStore.setBoothStyle($event.value.name)
	}
}