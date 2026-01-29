import { Component, inject, ViewChild } from '@angular/core';
import { Button } from "primeng/button";
import { Step, StepList, StepPanel, StepPanels, Stepper as S } from "primeng/stepper";
import { ExhibitionInfoMenuUi } from "../exhibition-info-menu-ui/exhibition-info-menu-ui";
import { ExhibitionInfoPreviewUi } from "../exhibition-info-preview-ui/exhibition-info-preview-ui";
import { MainStore } from "../tables/exhibitors/store/main.store";
import { RightChangeStore } from "../tables/rights-change-requirements/store/right-change.store";

@Component({
	selector: 'app-exhibition-rights-setting-process',
	imports: [
		Button,
		S,
		StepList,
		Step,
		StepPanels,
		StepPanel,
		ExhibitionInfoMenuUi,
		ExhibitionInfoPreviewUi
	],
	templateUrl: './exhibition-rights-setting-process.html',
	styleUrl: './exhibition-rights-setting-process.css',
	standalone: true
})
export class ExhibitionRightsSettingProcess {
	@ViewChild('stepper') stepper!: S;
	mainStore = inject(MainStore)
	rightChangeStore = inject(RightChangeStore)

	confirm() {
		this.mainStore.updateCompanyData()
		// this.mainStore.onSaveExhibitorRights()
		this.mainStore.onSetExhibitionLink()
		this.mainStore.setIsDialogVisible(false);
	}

	protected confirmRightChange() {
		this.mainStore.onSaveExhibitorRights()
		this.rightChangeStore.setIsDialogVisible(false);
	}
}
