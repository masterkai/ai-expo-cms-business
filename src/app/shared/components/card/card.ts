import { Component, input } from '@angular/core';
import { SpeakerAttachedFile } from "../speaker-attached-file/speaker-attached-file";
import { Tooltip } from "primeng/tooltip";
import { environment } from "../../../../environments/environment";
import { SpeakerInformation } from "../../../services/company-update-review.service";
import { Divider } from "primeng/divider";

@Component({
	selector: 'app-card',
	imports: [
		SpeakerAttachedFile,
		Tooltip,
		Divider
	],
	templateUrl: './card.html',
	styleUrl: './card.scss'
})
export class Card {
	basePath = environment.basePath
	speaker_information = input.required<SpeakerInformation>();

	getSpeakerPhotoFileName(url: string): string {
		const parts = url.split('/');
		return parts[parts.length - 1];
	}
}
