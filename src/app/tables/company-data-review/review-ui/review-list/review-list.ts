import { Component, inject, input } from '@angular/core';
import { TableModule } from "primeng/table";
import { CompanyUpdateReviewService, HistoryReviewItem } from "../../../../services/company-update-review.service";
import { HttpClient } from "@angular/common/http";
import { Button } from "primeng/button";
import { FileDownload } from "../../../../services/file-download";
import { CompanyDataReviewStore } from "../../store/company-data-review.store";
import { MessageService } from "primeng/api";

@Component({
	selector: 'app-review-list',
	imports: [
		TableModule,
		Button
	],
	templateUrl: './review-list.html',
	styleUrl: './review-list.css',
})
export class ReviewList {
	data = input.required<HistoryReviewItem[]>();
	modifyProcessService = inject(CompanyUpdateReviewService)
	messageService = inject(MessageService)
	reviewStore = inject(CompanyDataReviewStore)
	http = inject(HttpClient)
	downloader = inject(FileDownload)

	exportCSV_Review() {
		this.modifyProcessService.getHistoryDownload({
			cate: 'review',
			empno: this.reviewStore.empno() || '',
			departid: this.reviewStore.departid() || ''
		}).subscribe({
			next: (response) => {
				if (response.status === 'success' && response.data?.download_url) {
					const url = response.data.download_url;
					const filename = 'history_review.csv';
					this.downloader.downloadCsv(url, filename).subscribe({
						next: () => {
							this.messageService.add({
								severity: 'success',
								summary: '下載成功',
								detail: '歷史審核記錄已下載完成',
								life: 3000
							});
						},
						error: (err) => {
							this.messageService.add({
								severity: 'error',
								summary: '下載失敗',
								detail: `歷史審核記錄下載失敗。${err.message ? ' ' + err.message : ''}`,
								life: 5000
							});
						}
					});
				}
			}
		})


	}

	private extractFileName(url: string): string | null {
		const match = url.match(/filename=([^&]+)/);
		return match ? decodeURIComponent(match[1]) : null;
	}

	private toProxyUrl(url: string): string {
		return url.replace(/^https?:\/\/[^\/]+\/webservice/, '/webservice');
	}
}
