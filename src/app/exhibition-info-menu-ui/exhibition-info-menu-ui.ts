import { Component, inject, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MultiSelectModule } from 'primeng/multiselect';
import { MainStore } from "../tables/exhibitors/store/main.store";
import { Select } from "primeng/select";
import { InputNumber } from "primeng/inputnumber";
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
	gridNum = signal(1);
	// 攤位樣式(設計，標準，素地，新創)
	boothStyles = [
		{ name: '設計', code: 'design' },
		{ name: '標準', code: 'standard' },
		{ name: '素地', code: 'raw' },
		{ name: '新創', code: 'startup' }
	]
	selectedBoothStyles = signal<BoothStyles>({
		name: '',
		code: ''
	});

	constructor() {
		toObservable(this.selectedBoothStyles).subscribe({
			next: (selectedBoothStyles) => {
				console.log('selectedBoothStyles changed:', selectedBoothStyles);
			}
		})
	}

	onGridNumChange(value: number) {
		this.gridNum.set(value);
		this.mainStore.setGridNumber(value + '')
	}


	protected onBoothStyleChange($event: BoothStyles) {
		this.selectedBoothStyles.set($event);
		this.mainStore.setBoothStyle($event.name)
	}
}

interface BoothStyles {
	name: string;
	code: string;
}