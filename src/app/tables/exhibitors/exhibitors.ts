import { Component, inject, signal } from '@angular/core';
import { TableModule } from "primeng/table";
import { ExhibitorItem, ExhibitorService } from "../../services/exhibitor.service";
import { DatePipe } from "@angular/common";
import { AppDialogService } from "../../services/app-dialog.service";
import {
	ExhibitionRightsSettingProcess
} from "../../exhibition-rights-setting-process/exhibition-rights-setting-process";
import { Button } from "primeng/button";

@Component({
	selector: 'app-exhibitors',
	imports: [
		TableModule,
		DatePipe,
		Button,
	],
	templateUrl: './exhibitors.html',
	styleUrl: './exhibitors.css',
})
export class Exhibitors {
	dialog = inject(AppDialogService)
	exhibitorsService = inject(ExhibitorService)
	exhibitors = signal<ExhibitorItem[]>([])

	ngOnInit() {
		this.exhibitorsService.getExhibitors().then(data => {
			this.exhibitors.set(data)
		})
	}

	openDialog() {
		const ref = this.dialog.open(ExhibitionRightsSettingProcess, {
			header: '建立專屬連結',
			width: '98%',
			data: {
				userId: 1,
				name: 'Max'
			}
		});

		ref.onClose.subscribe(result => {
			console.log('Dialog 回傳：', result);
		});
	}

	protected exportExcel() {
		console.log('exportExcel');
	}
}
