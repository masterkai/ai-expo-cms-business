import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: 'root',
})
export class ExhibitionRightsService {
	private http = inject(HttpClient);

	/*
	參展權益API
	getRights
	參數：
	id: 參展ID
	type: ''(預設:空值是參展權益填寫頁) or 'modify' (修改權益使用)

	回傳資料：
	compID: 公司ID
	company_name: 公司名稱
	unified_business_no: 統一編號
	rights: 權益清單陣列
	lecture: 講座選項陣列
	booth: 攤位選項陣列
	stage: 舞台選項陣列
	promotion: 宣傳選項陣列
	optional: 其他選項陣列
	 */
	getRights(data: GetRightsParam) {
		const url = `${environment.apiUrl}/getRights`;
		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
		const body = new URLSearchParams();
		body.set('id', data.id);
		body.set('type', data.type);
		return this.http.post<GetRightsResponse>(url, body.toString(), { headers });
	}

	setRights(data: SetRightsParam) {
		const url = `${environment.apiUrl}/setRights`;
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		return this.http.post<SetRightsResponse>(url, data, { headers });
	}
}

export interface SetRightsResponse {
	status: 'success' | 'error';
	message: string;
}

export interface GetRightsParam {
	id: string;
	type: '' | 'modify'
}

export interface SetRightsParam {
	compID: string;
	type: '' | 'modify';
	items: {
		id: number;
		itemCate: string;
	} [];
}

export interface GetRightsResponse {
	status: 'success' | 'error';
	message: string;
	data: RightsDATA;
}

export interface RightsDATA {
	compID: string;
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