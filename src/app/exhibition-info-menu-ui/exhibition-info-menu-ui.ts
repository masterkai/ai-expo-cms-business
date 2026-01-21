import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MultiSelectModule } from 'primeng/multiselect';
import { MainStore } from "../tables/exhibitors/store/main.store";
import { Select, SelectChangeEvent } from "primeng/select";
import { InputNumber, InputNumberInputEvent } from "primeng/inputnumber";
import { toObservable } from "@angular/core/rxjs-interop";

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
	gridNum = 1;
	// 攤位樣式(設計，標準，素地，新創)
	boothStyles: BoothStyles[] = [
		{ name: '設計', code: 'design' },
		{ name: '標準', code: 'standard' },
		{ name: '素地', code: 'raw' },
		{ name: '新創', code: 'startup' }
	]
	selectedBoothStyles: BoothStyles | null = null;

	constructor() {
		toObservable(this.mainStore.booth_style).subscribe({
			next: (booth_style) => {
				console.log('booth_style changed:', booth_style);
				if (booth_style === '') {
					this.selectedBoothStyles = null;
				}
			}
		})
		toObservable(this.mainStore.grid_num).subscribe({
			next: (grid_num) => {
				console.log('grid_num changed:', grid_num);
				if (grid_num === '') {
					this.gridNum = 1;
				}
			}
		})
	}

	onGridNumChange($event: InputNumberInputEvent) {
		this.mainStore.setGridNumber($event.value + '')
	}

	protected onBoothStyleChange($event: SelectChangeEvent) {
		this.mainStore.setBoothStyle($event.value.name)
	}
}

interface BoothStyles {
	name: string;
	code: string;
}