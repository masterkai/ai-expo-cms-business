import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { TableModule } from "primeng/table";
import { Button } from "primeng/button";
import { RightChangeStore } from "./store/right-change.store";
import { CommonDialog } from "../../shared/components/common-dialog/common-dialog";
import { RightsChangeRequirementItem } from "../../services/rights-change-requirements.service";
import { MainStore } from "../exhibitors/store/main.store";
import {
	ExhibitionRightsSettingProcess
} from "../../exhibition-rights-setting-process/exhibition-rights-setting-process";

@Component({
	selector: 'app-rights-change-requirements',
	imports: [
		TableModule,
		Button,
		CommonDialog,
		ExhibitionRightsSettingProcess,
	],
	templateUrl: './rights-change-requirements.html',
	styleUrl: './rights-change-requirements.css',
	standalone: true
})
export class RightsChangeRequirements implements AfterViewInit {
	rightChangeStore = inject(RightChangeStore)
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
					// console.log('Dialog closed, resetting selections.');
					this.rightChangeStore.setRightChangeMode(false)
					this.mainStore.resetSelectedExhibitionRights()
					this.rightChangeStore.setCurrentCompID(null);
				}
				this.rightChangeStore.setIsDialogVisible(value);
			}
		})
	}


	protected handleViewDetails(item: RightsChangeRequirementItem) {
		console.log('View details for item:', item);
		const id = item.unified_business_no
		const option_items = item.option_items
		this.mainStore.getExhibitionRights({ id, type: 'modify' })
		this.mainStore.setSelectedExhibitionRights(option_items)
		// 在這裡添加查看詳細信息的邏輯
		this.rightChangeStore.setCurrentCompID(item.compID);
		this.rightChangeStore.setIsDialogVisible(true);
		this.rightChangeStore.setRightChangeMode(true)
	}
}
