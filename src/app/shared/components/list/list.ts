import { Component } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "primeng/tabs";
import { TableModule } from "primeng/table";
import { Exhibitors } from "../../../tables/exhibitors/exhibitors";
import { RightsChangeRequirements } from "../../../tables/rights-change-requirements/rights-change-requirements";
import {
	DocumentUpdatesPendingReview
} from "../../../tables/document-updates-pending-review/document-updates-pending-review";

@Component({
	selector: 'app-list',
	imports: [
		TabPanel,
		TabPanels,
		TabList,
		Tab,
		Tabs,
		TableModule,
		Exhibitors,
		RightsChangeRequirements,
		DocumentUpdatesPendingReview
	],
	templateUrl: './list.html',
	styleUrl: './list.css',
})
export class List {

}
