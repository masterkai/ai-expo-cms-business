import { Component, inject, input } from '@angular/core';
import { TableModule } from "primeng/table";
import { CompanyUpdateReviewService, HistoryReviewItem } from "../../../../services/company-update-review.service";
import { HttpClient } from "@angular/common/http";
import { Button } from "primeng/button";

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
	http = inject(HttpClient)

	protected exportCSV_Review() {
		this.modifyProcessService.getHistoryDownload('review').subscribe({
			next: (response) => {
				if (response.status === 'success' && response.data?.download_url) {
					const proxyUrl = this.toProxyUrl(response.data.download_url);
					this.http.get(proxyUrl, {
						responseType: 'blob',
						withCredentials: true
					}).subscribe({
						next: (blob) => {
							const url = window.URL.createObjectURL(blob);
							const a = document.createElement('a');
							a.href = url;
							a.download = this.extractFileName(response.data.download_url) || 'download.csv';
							document.body.appendChild(a);
							a.click();
							document.body.removeChild(a);
							window.URL.revokeObjectURL(url);
						},
						error: (err) => {
							console.error('File download failed:', err);
						}
					});
				} else {
					console.error('Failed to get download URL for modify process records.');
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
