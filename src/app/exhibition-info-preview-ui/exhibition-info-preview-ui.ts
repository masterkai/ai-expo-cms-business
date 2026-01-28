import { Component, computed, inject } from '@angular/core';
import { MainStore } from "../tables/exhibitors/store/main.store";
import { Option } from "../services/exhibition-rights-service";
import { RightChangeStore } from "../tables/rights-change-requirements/store/right-change.store";

@Component({
	selector: 'app-exhibition-info-preview-ui',
	imports: [],
	templateUrl: './exhibition-info-preview-ui.html',
	styleUrl: './exhibition-info-preview-ui.css',
	standalone: true
})
export class ExhibitionInfoPreviewUi {
	rightChangeStore = inject(RightChangeStore)
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

	renderArrayContent(items: Option[]) {
		return items.map(i => i.option).join(', ')
	}
}
