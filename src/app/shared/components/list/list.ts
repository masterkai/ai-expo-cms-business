import { Component } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "primeng/tabs";

@Component({
	selector: 'app-list',
	imports: [
		TabPanel,
		TabPanels,
		TabList,
		Tab,
		Tabs
	],
	templateUrl: './list.html',
	styleUrl: './list.css',
})
export class List {

}
