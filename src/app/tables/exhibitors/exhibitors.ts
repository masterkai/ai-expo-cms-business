import { Component, inject } from '@angular/core';
import { TableModule } from "primeng/table";
import { DatePipe } from "@angular/common";
import { Button } from "primeng/button";
import { MainStore } from "./store/main.store";
import { MessageService } from "primeng/api";
import { Tooltip } from "primeng/tooltip";
import { Option } from "../../services/exhibition-rights-service";

@Component({
	selector: 'app-exhibitors',
	imports: [
		TableModule,
		DatePipe,
		Button,
		Tooltip,
	],
	templateUrl: './exhibitors.html',
	styleUrl: './exhibitors.css',
})
export class Exhibitors {
	messageService = inject(MessageService)
	mainStore = inject(MainStore);

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

	renderArrayContent(items: Option[]) {
		return items.map(i => i.option).join(', ')
	}

	protected exportExcel() {
		console.log('exportExcel');
	}
}
