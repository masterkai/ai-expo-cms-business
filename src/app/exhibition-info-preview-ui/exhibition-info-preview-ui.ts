import { Component, computed, inject } from '@angular/core';
import { MainStore } from "../store/main.store";
import { Select_item } from "../../mock-data/data";

@Component({
	selector: 'app-exhibition-info-preview-ui',
	imports: [],
	templateUrl: './exhibition-info-preview-ui.html',
	styleUrl: './exhibition-info-preview-ui.css',
})
export class ExhibitionInfoPreviewUi {
	mainStore = inject(MainStore)
	hasExhibitionRights = computed(() => {
		const rights = this.mainStore.selected_exhibition_right()
		return rights && Object.values(rights).some(value => {
			if (Array.isArray(value)) {
				return value.length > 0;
			}
			return value !== null && value !== undefined && value !== '';
		});
	})

	// 判定 selected_exhibition_right物件裡的属性是否有值，用computed 屬性實現

	renderArrayContent(items: Select_item[]) {
		return items.map(i => i.value).join(', ')
	}
}
