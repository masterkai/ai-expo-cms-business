import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { lastValueFrom } from "rxjs";

// Type for documentUpdatesPendingReview items
export interface CompanyUpdateReviewItem {
	compID: string;
	createdate: string;
	company_name: string;
	unified_business_no: string
}

/*
* 業務審核廠商資料確認頁
 */
@Injectable({
	providedIn: 'root',
})
export class CompanyUpdateReviewService {
	private http = inject(HttpClient);

	/*
	* 資料更新待審核清單
	* */
	getReviewRequest(page = '') {
		const url = `${environment.apiUrl}/getReviewRequest`;
		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
		const body = new URLSearchParams();
		body.set('page', page);
		return lastValueFrom(this.http.post<GetReviewRequestResponse>(url, body, { headers }));
	}

	/*
	* 廠商資料確認頁	*
	 */
	getReview(id: string) {
		const url = `${environment.apiUrl}/getReview`;
		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
		const body = new URLSearchParams();
		body.set('id', id);
		return lastValueFrom(this.http.post<GetReviewResponse>(url, body, { headers }));
	}
}

export interface GetReviewRequestResponse {
	status: 'success' | 'error';
	message: string;
	page: string;
	total: string;
	data: CompanyUpdateReviewItem[];
}

export interface GetReviewResponse {
	status: 'success' | 'error';
	message: string;
	data: CompanyUpdatePayload[];
}

/** 基本公司資訊 */
export interface BasicInfo {
	company_name: string;
	company_name_en: string;
	unified_business_no: string;
	company_website_url: string;
	company_address: string;
	company_profile: string;
}

/** 簡單電話型別（手機或其他純號碼） */
export interface PhoneNumber {
	country_code: string;
	number: string;
}

/** 公司辦公電話（含市話區碼與分機） */
export interface OfficePhone extends PhoneNumber {
	area_code?: string;
	extension?: string;
}

/** 聯絡人資料 */
export interface ContactPerson {
	name: string;
	title: string;
	email: string;
	mobile_phone: PhoneNumber;
	office_phone: OfficePhone;
}

/** 展覽權益確認項目 */
export interface ExhibitorRight {
	id: string;
	Cate: string;   // 原資料使用大寫 'Cate'
	title: string;
	comment?: string;
}

/** 展覽資訊更新之 highlight 條目 */
export interface HighlightItem {
	highlight: string;
	detail: string;
}

/** 展覽資訊更新 */
export interface ExhibitionInformationUpdate {
	logo_image: string;
	highlights: HighlightItem[];
	exhibition_theme: string;
}

/** 講者資訊 */
export interface SpeakerInformation {
	id: string;
	name: string;
	title: string;
	biography: string;
	ename?: string;
	etitle?: string;
	ebiography?: string;
	speaker_photo?: string;
	speech_manuscript?: string;
	briefing?: string;
}

/** 整體 payload / 請求資料型別 */
export interface CompanyUpdatePayload {
	basic_info: BasicInfo;
	contact_person: ContactPerson;
	confirmation_of_exhibitor_rights: ExhibitorRight[];
	exhibition_Information_Update: ExhibitionInformationUpdate;
	speaker_information: SpeakerInformation[];
}

