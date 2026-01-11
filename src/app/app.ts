import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from "primeng/toast";
import { MessageService } from "primeng/api";
import { MainStore } from "./tables/exhibitors/store/main.store";
import { RightChangeStore } from "./tables/rights-change-requirements/store/right-change.store";

@Component({
	selector: 'app-root',
	imports: [ RouterOutlet, Toast ],
	providers: [ MessageService, MainStore, RightChangeStore ],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	protected readonly title = signal('ai-expo-cms-business');
}
