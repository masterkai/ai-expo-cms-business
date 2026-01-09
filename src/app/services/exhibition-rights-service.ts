import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: 'root',
})
export class ExhibitionRightsService {
	private http = inject(HttpClient);

	getRights(data: RightsDATAParam) {
		const url = `${environment.apiUrl}/getRights`;
		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
		const body = new URLSearchParams();
		body.set('id', data.id);
		body.set('type', data.type);
		return this.http.post<GetRightsResponse>(url, body.toString(), { headers });
	}
}

export interface RightsDATAParam {
	id: string;
	type: '' | 'modify'
}

export interface GetRightsResponse {
	status: 'success' | 'error';
	message: string;
	data: RightsDATA;
}

export interface RightsDATA {
	id: string;
	company_name: string;
	unified_business_no: string;
	rights: Right[];
	lecture: Option[];
	booth: Option[];
	stage: Option[];
	promotion: Option[];
	optional: Option[];
}

export interface Option {
	id: string;
	option: string;
	selected: boolean;
}

export interface Right {
	id: string;
	cate: string;
	title: string;
	comment: string;
}