import { Component, inject } from '@angular/core';
import { MainStore } from "../store/main.store";

@Component({
	selector: 'app-exhibition-info-preview-ui',
	imports: [],
	templateUrl: './exhibition-info-preview-ui.html',
	styleUrl: './exhibition-info-preview-ui.css',
})
export class ExhibitionInfoPreviewUi {
	mainStore = inject(MainStore)
}
