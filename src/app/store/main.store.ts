import { patchState, signalStore, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { Exhibition_rights, initialMainSlice, Selected_Exhibition_rights } from "./main.slice";
import { inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { ExhibitorService } from "../services/exhibitor.service";
import { ExhibitionRightsService } from "../services/exhibition-rights-service";
import * as updaters from "./main.updaters";
import { withDevtools } from "@angular-architects/ngrx-toolkit";

export const MainStore = signalStore(
	withState(initialMainSlice),
	withProps(_ => ({
		_messageService: inject(MessageService),
		_exhibitorService: inject(ExhibitorService),
		_exhibitionRightsService: inject(ExhibitionRightsService),
	})),
	withMethods(store => {
		const setExhibitionRights = (rights: Exhibition_rights) => patchState(store, updaters.setExhibitionRights(rights));
		const getExhibitionRights = () => {
			store._exhibitionRightsService.getExhibitionRights().then(res => setExhibitionRights(res))
		}
		const setSelectedExhibitionRights = (partialSelectedRights: Partial<Selected_Exhibition_rights>) => patchState(store, updaters.setSelectedExhibitionRights(partialSelectedRights));

		const setIsDialogVisible = (visible: boolean) => patchState(store, updaters.setIsDialogVisible(visible));

		return {
			setExhibitionRights,
			setSelectedExhibitionRights,
			getExhibitionRights,
			setIsDialogVisible
		}
	}),
	withHooks(store => ({
		onInit() {
			store.getExhibitionRights()
		}
	})),
	withDevtools('main-store')
)