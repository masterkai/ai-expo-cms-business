import { Component, input } from '@angular/core';
import { Speaker_information } from "../../store/home.slice";
import { environment } from "../../../environments/environment";
import { SpeakerAttachedFile } from "../speaker-attached-file/speaker-attached-file";
import { Tooltip } from "primeng/tooltip";

@Component({
	selector: 'app-card',
	imports: [
		SpeakerAttachedFile,
		Tooltip
	],
	templateUrl: './card.html',
	styleUrl: './card.scss'
})
export class Card {
	basePath = environment.basePath
	speaker_information = input.required<Speaker_information>();

	getSpeakerPhotoFileName(url: string): string {
		const parts = url.split('/');
		return parts[parts.length - 1];
	}
}
