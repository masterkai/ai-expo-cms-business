import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Company } from "../tables/exhibitors/store/main.slice";
import { environment } from "../../environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
	providedIn: 'root',
})
export class ExhibitorService {
	private http = inject(HttpClient);

	getCompany() {
		const url = `${environment.apiUrl}/getCompany`;
		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return lastValueFrom(this.http.post<GetCompanyResponse>(url, '', { headers }));
	}

}


export interface ExhibitorItem {
	id: string;
	name: string;
	description: string;
	unino: string;
	agenda_session: string;
	update_time: string;
	exhibition_booths: string;
	media_advertising: string[];
	add_on_items: string[];
	dedicated_link: string;
}

export interface GetCompanyResponse {
	status: 'success' | 'error';
	message: string;
	page: string;
	total: string;
	empno: string;
	departid: string;
	data: Company[];
}
