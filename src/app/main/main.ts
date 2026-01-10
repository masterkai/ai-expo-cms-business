import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { Header } from "../shared/components/header/header";
import { List } from "../shared/components/list/list";
import { CommonDialog } from "../shared/components/common-dialog/common-dialog";
import { ExhibitionRightsSettingProcess } from "../exhibition-rights-setting-process/exhibition-rights-setting-process";
import { MainStore } from "../tables/exhibitors/store/main.store";

@Component({
	selector: 'app-main',
	imports: [
		Header,
		List,
		CommonDialog,
		ExhibitionRightsSettingProcess,
	],
	templateUrl: './main.html',
	styleUrl: './main.css',
})
export class Main implements AfterViewInit {
	mainStore = inject(MainStore)
	dialog = viewChild(CommonDialog)

	ngAfterViewInit() {
		this.dialog()?.visible$.subscribe({
			next: (value) => {
				console.log('Dialog visible changed:', value);
				// if dialog is closed, clear current company selection
				// and reset selected exhibition rights
				// and current company ID in the store
				if (!value) {
					this.mainStore.setCurrentCompany(null)
					this.mainStore.resetSelectedExhibitionRights()
					this.mainStore.setCurrentCompID(null)
				}
				this.mainStore.setIsDialogVisible(value);
			}
		})
	}
}
