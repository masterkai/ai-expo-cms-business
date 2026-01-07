import { Component, inject } from '@angular/core';
import { Header } from "../shared/components/header/header";
import { List } from "../shared/components/list/list";
import { MainStore } from "../store/main.store";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
	selector: 'app-main',
	imports: [
		Header,
		List,
	],
	providers: [MainStore, DynamicDialogConfig, DynamicDialogRef],
	templateUrl: './main.html',
	styleUrl: './main.css',
})
export class Main {
	mainStore = inject(MainStore);
}
