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
import { MessageService } from "primeng/api";

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
	messageService = inject(MessageService)
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

	copyLinkToClipboard(url: string) {
		console.log('copyLinkToClipboard', url);
		navigator.clipboard.writeText(url)
			.then(() => {
				console.log("連結已複製到剪貼簿");
				this.messageService.add({ severity: 'success', summary: '成功', detail: '連結已複製到剪貼簿' });
			})
			.catch(err => {
				console.error("複製失敗：", err);
				this.messageService.add({ severity: 'error', summary: '失敗', detail: '連結複製失敗' });
			});
	}

	protected exportExcel() {
		console.log('exportExcel');
	}
}
