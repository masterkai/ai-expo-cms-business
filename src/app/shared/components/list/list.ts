import { Component, inject } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "primeng/tabs";
import { TableModule } from "primeng/table";
import { Exhibitors } from "../../../tables/exhibitors/exhibitors";
import { RightsChangeRequirements } from "../../../tables/rights-change-requirements/rights-change-requirements";
import { MainStore } from "../../../tables/exhibitors/store/main.store";
import { CompanyDataReview } from "../../../tables/company-data-review/company-data-review";

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
		CompanyDataReview
	],
	templateUrl: './list.html',
	styleUrl: './list.css',
})
export class List {
	mainStore = inject(MainStore)
}
