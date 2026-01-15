import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { TableModule } from "primeng/table";
import { DatePipe } from "@angular/common";
import { Button } from "primeng/button";
import { MainStore } from "./store/main.store";
import { MessageService } from "primeng/api";
import { Tooltip } from "primeng/tooltip";
import { Option } from "../../services/exhibition-rights-service";
import { CommonDialog } from "../../shared/components/common-dialog/common-dialog";
import {
	ExhibitionRightsSettingProcess
} from "../../exhibition-rights-setting-process/exhibition-rights-setting-process";
import { Company } from "./store/main.slice";
import { FileDownload } from "../../services/file-download";
import { CompanyUpdateReviewService } from "../../services/company-update-review.service";

@Component({
	selector: 'app-exhibitors',
	imports: [
		TableModule,
		DatePipe,
		Button,
		Tooltip,
		CommonDialog,
		ExhibitionRightsSettingProcess,
	],
	templateUrl: './exhibitors.html',
	styleUrl: './exhibitors.css',
})
export class Exhibitors implements AfterViewInit {
	messageService = inject(MessageService)
	modifyProcessService = inject(CompanyUpdateReviewService)
	mainStore = inject(MainStore);
	dialog = viewChild(CommonDialog)
	downloader = inject(FileDownload)

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

	copyLinkToClipboard(exhibitor: Company) {
		const url = exhibitor.link
		console.log('copyLinkToClipboard', url);
		navigator.clipboard.writeText(url)
			.then(() => {
				console.log("連結已複製到剪貼簿");
				this.messageService.add({ severity: 'success', summary: '成功', detail: '連結已複製到剪貼簿' });
			}).then(() => {
				this.mainStore.onGetLink(exhibitor.unified_business_no)
			})
			.catch(err => {
				console.error("複製失敗：", err);
				this.messageService.add({ severity: 'error', summary: '失敗', detail: '連結複製失敗' });
			});
	}

	renderArrayContent(items: Option[]) {
		return items.map(i => i.option).join(', ')
	}

	protected exportCompanyCSV() {
		this.modifyProcessService.getHistoryDownload({
			cate: 'company',
			empno: this.mainStore.empno() || '',
			departid: this.mainStore.departid() || ''
		}).subscribe({
			next: (response) => {
				if (response.status === 'success' && response.data?.download_url) {
					const url = response.data.download_url;
					const filename = 'history_review.csv';
					this.downloader.downloadCsv(url, filename).subscribe({
						next: () => {
							console.log('下載完成');
						},
						error: (err) => {
							alert(err.message || '下載失敗');
						}
					});
				}
			}
		})


	}
}
