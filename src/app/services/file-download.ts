import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
	providedIn: 'root',
})
export class FileDownload {
	constructor(private http: HttpClient) {
	}

	downloadCsv(url: string, filename: string, withCredentials = false): Observable<void> {
		return this.http.get(url, {
			responseType: 'blob',
			observe: 'response',
			withCredentials
		}).pipe(
			map((res: HttpResponse<Blob>) => {
				const blob = res.body ?? new Blob();
				const link = document.createElement('a');
				const urlObj = window.URL.createObjectURL(blob);
				link.href = urlObj;
				link.download = filename;
				document.body.appendChild(link);
				link.click();
				link.remove();
				window.URL.revokeObjectURL(urlObj);
			}),
			catchError((err: HttpErrorResponse) => {
				if (err.status === 0) {
					console.error('Download failed: network/CORS/blocked or offline', err);
					return throwError(() => new Error('Network or CORS error (status 0)。請檢查網路、瀏覽器 Console、伺服器 CORS 與 TLS。'));
				}
				return throwError(() => err);
			})
		);
	}
}
