import { Component, inject, input } from '@angular/core';
import { TableModule } from "primeng/table";
import { CompanyUpdateReviewService, HistoryReviewItem } from "../../../../services/company-update-review.service";
import { HttpClient } from "@angular/common/http";
import { Button } from "primeng/button";
import { FileDownload } from "../../../../services/file-download";
import { CompanyDataReviewStore } from "../../store/company-data-review.store";

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

	private extractFileName(url: string): string | null {
		const match = url.match(/filename=([^&]+)/);
		return match ? decodeURIComponent(match[1]) : null;
	}

	private toProxyUrl(url: string): string {
		return url.replace(/^https?:\/\/[^\/]+\/webservice/, '/webservice');
	}
}
