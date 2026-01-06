import { Component, inject, signal } from '@angular/core';
import { TableModule } from "primeng/table";
import { ExhibitorItem, ExhibitorService } from "../../services/exhibitor.service";
import { DatePipe } from "@angular/common";

@Component({
	selector: 'app-exhibitors',
	imports: [
		TableModule,
		DatePipe
	],
	templateUrl: './exhibitors.html',
	styleUrl: './exhibitors.css',
})
export class Exhibitors {
	exhibitorsService = inject(ExhibitorService)
	exhibitors = signal<ExhibitorItem[]>([])

	ngOnInit() {
		this.exhibitorsService.getExhibitors().then(data => {
			this.exhibitors.set(data)
		})
	}
}
