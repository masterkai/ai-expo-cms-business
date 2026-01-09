import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "primeng/tabs";
import { TableModule } from "primeng/table";
import { Exhibitors } from "../../../tables/exhibitors/exhibitors";
import { RightsChangeRequirements } from "../../../tables/rights-change-requirements/rights-change-requirements";
import {
	DocumentUpdatesPendingReview
} from "../../../tables/document-updates-pending-review/document-updates-pending-review";
import { CommonDialog } from "../common-dialog/common-dialog";
import {
	ExhibitionRightsSettingProcess
} from "../../../exhibition-rights-setting-process/exhibition-rights-setting-process";
import { MainStore } from "../../../store/main.store";

@Component({
	selector: 'app-list',
	imports: [
		TabPanel,
		TabPanels,
		TabList,
		Tab,
		Tabs,
		TableModule,
		Exhibitors,
		RightsChangeRequirements,
		DocumentUpdatesPendingReview,
		CommonDialog,
		ExhibitionRightsSettingProcess
	],
	templateUrl: './list.html',
	styleUrl: './list.css',
})
export class List implements AfterViewInit {
	mainStore = inject(MainStore)
	dialog = viewChild(CommonDialog)

	ngAfterViewInit() {
		this.dialog()?.visible$.subscribe({
			next: (value) => {
				console.log('Dialog visible changed:', value);
				// if dialog is closed, clear current company
				if (!value) {
					this.mainStore.setCurrentCompany(null)
					this.mainStore.resetSelectedExhibitionRights()
				}
				this.mainStore.setIsDialogVisible(value);
			}
		})
	}
}
