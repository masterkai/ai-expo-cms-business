import { Component, inject } from '@angular/core';
import { Button } from "primeng/button";
import { Step, StepList, StepPanel, StepPanels, Stepper } from "primeng/stepper";
import { ExhibitionInfoMenuUi } from "../exhibition-info-menu-ui/exhibition-info-menu-ui";
import { ExhibitionInfoPreviewUi } from "../exhibition-info-preview-ui/exhibition-info-preview-ui";
import { MainStore } from "../store/main.store";

@Component({
	selector: 'app-exhibition-rights-setting-process',
	imports: [
		Button,
		Stepper,
		StepList,
		Step,
		StepPanels,
		StepPanel,
		ExhibitionInfoMenuUi,
		ExhibitionInfoPreviewUi
	],
	templateUrl: './exhibition-rights-setting-process.html',
	styleUrl: './exhibition-rights-setting-process.css',
})
export class ExhibitionRightsSettingProcess {
	mainStore = inject(MainStore)

	confirm() {
		this.mainStore.updateCompanyData()
		this.mainStore.onSaveExhibitorRights()
		this.mainStore.onSetExhibitionLink()
		this.mainStore.setIsDialogVisible(false);
	}
}
