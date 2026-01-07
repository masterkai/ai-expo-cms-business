import { Component, inject, signal, viewChild } from '@angular/core';
import { TableModule } from "primeng/table";
import { ExhibitorItem, ExhibitorService } from "../../services/exhibitor.service";
import { DatePipe } from "@angular/common";
import {
	ExhibitionRightsSettingProcess
} from "../../exhibition-rights-setting-process/exhibition-rights-setting-process";
import { Button } from "primeng/button";
import { MainStore } from "../../store/main.store";
import { CommonDialog } from "../../shared/components/common-dialog/common-dialog";

@Component({
	selector: 'app-exhibitors',
	imports: [
		TableModule,
		DatePipe,
		Button,
		CommonDialog,
		ExhibitionRightsSettingProcess,
	],
	templateUrl: './exhibitors.html',
	styleUrl: './exhibitors.css',
})
export class Exhibitors {
	mainStore = inject(MainStore);
	dialog = viewChild(CommonDialog)
	exhibitorsService = inject(ExhibitorService)
	exhibitors = signal<ExhibitorItem[]>([])

	ngAfterViewInit() {
		this.dialog()?.visible$.subscribe({
			next: (value) => {
				console.log('Dialog visible changed:', value);
				this.mainStore.setIsDialogVisible(value);
			}
		})
	}

	ngOnInit() {
		this.exhibitorsService.getExhibitors().then(data => {
			this.exhibitors.set(data)
		})
	}

	openDialog() {
		this.dialog()?.onOpen()
	}

	protected exportExcel() {
		console.log('exportExcel');
	}
}
