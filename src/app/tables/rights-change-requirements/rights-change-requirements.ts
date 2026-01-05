import { Component, inject, signal } from '@angular/core';
import {
	RightsChangeRequirementItem,
	RightsChangeRequirementsService
} from "../../services/rights-change-requirements.service";
import { TableModule } from "primeng/table";
import { Button } from "primeng/button";
import { DatePipe } from "@angular/common";

@Component({
	selector: 'app-rights-change-requirements',
	imports: [
		TableModule,
		Button,
		DatePipe
	],
	templateUrl: './rights-change-requirements.html',
	styleUrl: './rights-change-requirements.css',
})
export class RightsChangeRequirements {
	rightsChangeRequirementsService = inject(RightsChangeRequirementsService)
	rightsChangeRequirements = signal<RightsChangeRequirementItem[]>([])

	ngOnInit() {
		this.rightsChangeRequirementsService.getRightsChangeRequirementsItems().then(data => {
			this.rightsChangeRequirements.set(data)
		})
	}

	protected handleViewDetails(item: any) {
		console.log('View details for item:', item);
		// 在這裡添加查看詳細信息的邏輯
	}
}
