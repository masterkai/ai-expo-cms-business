import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class Exhibitor {
	exhibitors = [
		{
			name: 'Exhibitor One',
			description: 'Description for Exhibitor One',
			unino: '16300799',
			agenda_session: 'Session A',
			update_time: '2025-01-01 10:00:00',
			exhibition_booths: 'Booth 1',
			media_advertising: ['X Album EP1 廣告置入', '攤位開箱'],
			add_on_items: ['獨家識別織帶', '加購項目2'],
			dedicated_link: 'https://example.com/exhibitor-one',
		},
		{
			name: 'Exhibitor Two',
			description: 'Description for Exhibitor Two',
			unino: '16300800',
			agenda_session: 'Session B',
			update_time: '2025-01-02 11:00:00',
			exhibition_booths: 'Booth 2',
			media_advertising: ['Y Album EP2 廣告置入', '攤位開箱'],
			add_on_items: ['獨家識別織帶', '加購項目3'],
			dedicated_link: 'https://example.com/exhibitor-two',
		},
		{
			name: 'Exhibitor Three',
			description: 'Description for Exhibitor Three',
			unino: '16300801',
			agenda_session: 'Session C',
			update_time: '2025-01-03 12:00:00',
			exhibition_booths: 'Booth 3',
			media_advertising: ['Z Album EP3 廣告置入', '攤位開箱'],
			add_on_items: ['獨家識別織帶', '加購項目4'],
			dedicated_link: 'https://example.com/exhibitor-three',
		},
		{
			name: 'Exhibitor Four',
			description: 'Description for Exhibitor Four',
			unino: '16300802',
			agenda_session: 'Session D',
			update_time: '2025-01-04 13:00:00',
			exhibition_booths: 'Booth 4',
			media_advertising: ['W Album EP4 廣告置入', '攤位開箱'],
			add_on_items: ['獨家識別織帶', '加購項目5'],
			dedicated_link: 'https://example.com/exhibitor-four',
		},
		{
			name: 'Exhibitor Five',
			description: 'Description for Exhibitor Five',
			unino: '16300803',
			agenda_session: 'Session E',
			update_time: '2025-01-05 14:00:00',
			exhibition_booths: 'Booth 5',
			media_advertising: ['V Album EP5 廣告置入', '攤位開箱'],
			add_on_items: ['獨家識別織帶', '加購項目6'],
			dedicated_link: 'https://example.com/exhibitor-five',
		}
	]

	getExhibitors() {
		return this.exhibitors;
	}
}
