import { Component } from '@angular/core';
import { Header } from "../shared/components/header/header";
import { List } from "../shared/components/list/list";

@Component({
	selector: 'app-main',
	imports: [
		Header,
		List,
	],
	templateUrl: './main.html',
	styleUrl: './main.css',
})
export class Main {
}
