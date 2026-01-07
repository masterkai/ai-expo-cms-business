import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Step, StepList, StepPanel, StepPanels, Stepper } from "primeng/stepper";
import { ExhibitionInfoMenuUi } from "../exhibition-info-menu-ui/exhibition-info-menu-ui";
import { MainStore } from "../store/main.store";
import { MessageService } from "primeng/api";
import { ExhibitionInfoPreviewUi } from "../exhibition-info-preview-ui/exhibition-info-preview-ui";

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
	providers: [MainStore, MessageService]
})
export class ExhibitionRightsSettingProcess {
	constructor(
		public config: DynamicDialogConfig,
		private ref: DynamicDialogRef
	) {
	}

	confirm() {
		this.ref.close({
			confirmed: true,
			timestamp: new Date()
		});
	}
}
