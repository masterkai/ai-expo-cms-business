import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { JsonPipe } from "@angular/common";

@Component({
	selector: 'app-exhibition-rights-setting-process',
	imports: [
		Button,
		JsonPipe
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
