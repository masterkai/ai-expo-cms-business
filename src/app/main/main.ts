import { Component } from '@angular/core';
import { Header } from "../shared/components/header/header";

@Component({
	selector: 'app-main',
	imports: [
		Header
	],
	templateUrl: './main.html',
	styleUrl: './main.css',
})
export class Main {

}
