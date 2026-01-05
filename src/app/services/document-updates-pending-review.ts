import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class DocumentUpdatesPendingReview {
	documentUpdatesPendingReview = [
		{
			id: '1',
			application_time: '2024-06-01T10:00:00Z',
			company_name: 'Company A',
			unino: '12345678',
			column_name: 'Exhibition Booth Details',
			old_value: 'Booth A1, Booth A2',
			new_value: 'Booth A1, Booth A2, Booth A3',
		},
		{
			id: '2',
			application_time: '2024-06-02T11:30:00Z',
			company_name: 'Company B',
			unino: '87654321',
			column_name: 'Media Advertising',
			old_value: 'Ad Campaign X',
			new_value: 'Ad Campaign X, Ad Campaign Y',
		},
		{
			id: '3',
			application_time: '2024-06-03T09:15:00Z',
			company_name: 'Company C',
			unino: '11223344',
			column_name: 'Add-On Items',
			old_value: 'Item 1, Item 2',
			new_value: 'Item 1, Item 2, Item 3',
		},
		{
			id: '4',
			application_time: '2024-06-04T14:45:00Z',
			company_name: 'Company D',
			unino: '44332211',
			column_name: 'Dedicated Link',
			old_value: 'https://old-link.com',
			new_value: 'https://new-link.com',
		},
		{
			id: '5',
			application_time: '2024-06-05T16:20:00Z',
			company_name: 'Company E',
			unino: '55667788',
			column_name: 'Exhibition Booth Details',
			old_value: 'Booth E1',
			new_value: 'Booth E1, Booth E2',
		},
		{
			id: '6',
			application_time: '2024-06-06T12:10:00Z',
			company_name: 'Company F',
			unino: '88776655',
			column_name: 'Media Advertising',
			old_value: 'Ad Campaign Z',
			new_value: 'Ad Campaign Z, Ad Campaign W',
		}
	]

	async getDocumentUpdatesPendingReview() {
		return await this.documentUpdatesPendingReview;
	}
}
