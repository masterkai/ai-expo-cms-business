import { Component, inject, signal } from '@angular/core';
import { RightsChangeRequirementItem } from "../../services/rights-change-requirements.service";
import { TableModule } from "primeng/table";
import { Button } from "primeng/button";
import { RightChangeStore } from "./store/right-change.store";

@Component({
	selector: 'app-rights-change-requirements',
	imports: [
		TableModule,
		Button,
	],
	templateUrl: './rights-change-requirements.html',
	styleUrl: './rights-change-requirements.css',
})
export class RightsChangeRequirements {
	rightChangeStore = inject(RightChangeStore)
	rightsChangeRequirements = signal<RightsChangeRequirementItem[]>([])


	protected handleViewDetails(item: any) {
		console.log('View details for item:', item);
		// 在這裡添加查看詳細信息的邏輯
	}
}
