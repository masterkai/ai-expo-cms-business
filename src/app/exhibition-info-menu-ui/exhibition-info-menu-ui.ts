import { Component, inject, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MultiSelectModule } from 'primeng/multiselect';
import { MainStore } from "../tables/exhibitors/store/main.store";
import { Select } from "primeng/select";
import { InputNumber } from "primeng/inputnumber";

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
})
export class ExhibitionInfoMenuUi {
	mainStore = inject(MainStore)
	gridNum = signal(0);
	// 攤位樣式(設計，標準，素地，新創)
	boothStyles = [
		{ name: '設計', code: 'design' },
		{ name: '標準', code: 'standard' },
		{ name: '素地', code: 'raw' },
		{ name: '新創', code: 'startup' }
	]
	selectedBoothStyles = signal<string[]>([]);

	onGridNumChange(value: number) {
		this.gridNum.set(value);
	}


}
