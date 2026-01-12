import { Component } from '@angular/core';
import { environment } from "../../../../environments/environment";

@Component({
	selector: 'app-header',
	imports: [],
	templateUrl: './header.html',
	styleUrl: './header.css',
})
export class Header {
	basePath = environment.basePath
}
