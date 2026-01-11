import { Component, input } from '@angular/core';
import { Tooltip } from "primeng/tooltip";
import { environment } from "../../../../environments/environment";
import { Select } from "primeng/select";

@Component({
	selector: 'app-speaker-attached-file',
	imports: [
		Tooltip,
		Select
	],
	templateUrl: './speaker-attached-file.html',
	styleUrl: './speaker-attached-file.scss'
})
export class SpeakerAttachedFile {
	data = input.required<string>()
	title = input.required<string>();
	icon = input.required<string>();
	alt = input.required<string>();
	protected basePath = environment.basePath;

	getFileName(inputUrl: string) {
		const urlObj = new URL(inputUrl);
		return urlObj.searchParams.get('filename');
	}
}
