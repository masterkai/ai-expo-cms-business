import { Routes } from '@angular/router';
import { Main } from "./main/main";
import { MainStore } from "./tables/exhibitors/store/main.store";
import { RightChangeStore } from "./tables/rights-change-requirements/store/right-change.store";

export const routes: Routes = [
	{
		path: '',
		component: Main,
		providers: [ MainStore, RightChangeStore ]
	}
];
