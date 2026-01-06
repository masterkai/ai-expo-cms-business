import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Step, StepList, StepPanel, StepPanels, Stepper } from "primeng/stepper";

@Component({
	selector: 'app-exhibition-rights-setting-process',
	imports: [
		Button,
		Stepper,
		StepList,
		Step,
		StepPanels,
		StepPanel
	],
	templateUrl: './exhibition-rights-setting-process.html',
	styleUrl: './exhibition-rights-setting-process.css',
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
