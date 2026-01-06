import { patchState, signalStore, withMethods, withProps, withState } from "@ngrx/signals";
import { initialMainSlice, MainSlice } from "./main.slice";
import { inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { ExhibitorService } from "../services/exhibitor.service";
import { ExhibitionRightsService } from "../services/exhibition-rights-service";
import * as updaters from "./main.updaters";

export const MainStore = signalStore(
	withState(initialMainSlice),
	withProps(_ => ({
		_messageService: inject(MessageService),
		_exhibitorService: inject(ExhibitorService),
		_exhibitionRightsService: inject(ExhibitionRightsService),
	})),
	withMethods(store => {
		const setExhibitionRights = (rights: Partial<MainSlice>['exhibition_rights']) => patchState(store, updaters.setExhibitionRights(rights));
		return {
			setExhibitionRights
		}
	})
)