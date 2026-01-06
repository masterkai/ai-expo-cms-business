import { signalStore, withProps, withState } from "@ngrx/signals";
import { initialMainSlice } from "./main.slice";
import { inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { ExhibitorService } from "../services/exhibitor.service";
import { ExhibitionRightsService } from "../services/exhibition-rights-service";

export const MainStore = signalStore(
	withState(initialMainSlice),
	withProps(_ => ({
		_messageService: inject(MessageService),
		_exhibitorService: inject(ExhibitorService),
		_exhibitionRightsService: inject(ExhibitionRightsService),
	}))
)