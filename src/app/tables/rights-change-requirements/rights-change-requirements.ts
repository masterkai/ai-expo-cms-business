import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { TableModule } from "primeng/table";
import { Button } from "primeng/button";
import { RightChangeStore } from "./store/right-change.store";
import { CommonDialog } from "../../shared/components/common-dialog/common-dialog";

@Component({
	selector: 'app-rights-change-requirements',
	imports: [
		TableModule,
		Button,
		CommonDialog,
	],
	templateUrl: './rights-change-requirements.html',
	styleUrl: './rights-change-requirements.css',
})
export class RightsChangeRequirements implements AfterViewInit {
	rightChangeStore = inject(RightChangeStore)

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
				}
				this.rightChangeStore.setIsDialogVisible(value);
			}
		})
	}


	protected handleViewDetails(item: any) {
		console.log('View details for item:', item);
		// 在這裡添加查看詳細信息的邏輯
		this.rightChangeStore.setIsDialogVisible(true);
		this.rightChangeStore.setRightChangeMode(true)
	}
}
