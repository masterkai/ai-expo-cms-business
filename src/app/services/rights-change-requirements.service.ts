import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class RightsChangeRequirementsService {
	rightsChangeRequirements: RightsChangeRequirementItem[] = [
		{
			id: '1',
			application_time: '2024-01-15T10:00:00Z',
			company_name: 'Tech Innovators Inc.',
			unino: '12345678',
			item_name: 'Standard Exhibition Booth',
		},
		{
			id: '2',
			application_time: '2024-02-20T14:30:00Z',
			company_name: 'Creative Solutions Ltd.',
			unino: '87654321',
			item_name: 'Premium Sponsorship Package',
		},
		{
			id: '3',
			application_time: '2024-03-05T09:15:00Z',
			company_name: 'Global Tech Corp.',
			unino: '11223344',
			item_name: 'Digital Advertising Slot',
		},
		{
			id: '4',
			application_time: '2024-04-10T11:45:00Z',
			company_name: 'NextGen Innovations',
			unino: '44332211',
			item_name: 'Exhibition Booth Upgrade',
		},
		{
			id: '5',
			application_time: '2024-05-18T16:20:00Z',
			company_name: 'FutureTech Enterprises',
			unino: '55667788',
			item_name: 'Additional Media Exposure',
		},
		{
			id: '6',
			application_time: '2024-06-22T13:10:00Z',
			company_name: 'Innovatech Solutions',
			unino: '99887766',
			item_name: 'Custom Sponsorship Package',
		}
	]

	async getRightsChangeRequirementsItems() {
		return await this.rightsChangeRequirements;
	}
}


export interface RightsChangeRequirementItem {
	id: string;
	application_time: string;
	company_name: string;
	unino: string;
	item_name: string;
}