import { Component, inject, signal } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "primeng/tabs";
import { Exhibitor, ExhibitorItem } from "../../../services/exhibitor";
import { TableModule } from "primeng/table";

@Component({
	selector: 'app-list',
	imports: [
		TabPanel,
		TabPanels,
		TabList,
		Tab,
		Tabs,
		TableModule
	],
	templateUrl: './list.html',
	styleUrl: './list.css',
})
export class List {
	exhibitorsService = inject(Exhibitor)
	exhibitors = signal<ExhibitorItem[]>([])

	ngOnInit() {
		this.exhibitorsService.getExhibitors().then(data => {
			this.exhibitors.set(data)
		})
	}
}
