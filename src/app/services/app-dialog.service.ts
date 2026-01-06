import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

@Injectable({
	providedIn: 'root',
})
export class AppDialogService {
	private ref?: DynamicDialogRef<any> | null;
	private dialogService = inject(DialogService)

	open<T>(
		component: any,
		options?: {
			header?: string;
			data?: T;
			width?: string;
			height?: string;
			closable?: boolean;
			modal?: boolean;
		}
	): DynamicDialogRef {

		this.ref = this.dialogService.open(component, {
			header: options?.header ?? '',
			data: options?.data,
			width: options?.width ?? '500px',
			height: options?.height,
			closable: options?.closable ?? true,
			modal: options?.modal ?? true
		});

		return <DynamicDialogRef<any>>this.ref;
	}

	close(result?: any): void {
		this.ref?.close(result);
	}
}
