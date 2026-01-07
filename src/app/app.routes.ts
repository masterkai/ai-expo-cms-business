import { Routes } from '@angular/router';
import { Main } from "./main/main";
import { MainStore } from "./store/main.store";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

export const routes: Routes = [
	{
		path: '',
		component: Main,
		providers: [MainStore, DynamicDialogConfig]
	}
];
