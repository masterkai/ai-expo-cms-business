import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { lastValueFrom } from "rxjs";

/*
權益異動申請需求
 */
@Injectable({
	providedIn: 'root',
})
export class RightsChangeRequirementsService {
	private http = inject(HttpClient);

	getRightsRequest(page = '') {
		const url = `${environment.apiUrl}/getRightsRequest`;
		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
		const body = new URLSearchParams();
		body.set('page', page);
		return lastValueFrom(this.http.post<GetRightsRequestRes>(url, body, { headers }));
	}
}

export interface GetRightsRequestRes {
	status: 'success' | 'error';
	message: string;
	page: string;
	total: string;
	data: RightsChangeRequirementItem[];
}


export interface RightsChangeRequirementItem {
	compID: string;
	createdate: string;
	company_name: string;
	unified_business_no: string;
}