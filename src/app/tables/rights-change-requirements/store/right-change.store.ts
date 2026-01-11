import {
	patchState,
	signalStore,
	type,
	withComputed,
	withHooks,
	withMethods,
	withProps,
	withState
} from "@ngrx/signals";
import { initialRightChangeSlice } from "./right-change.slice";
import { entityConfig, setAllEntities, withEntities } from "@ngrx/signals/entities";
import {
	RightsChangeRequirementItem,
	RightsChangeRequirementsService
} from "../../../services/rights-change-requirements.service";
import { computed, inject } from "@angular/core";
import { injectQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { MessageService } from "primeng/api";
import { RIGHTS_CHANGE_REQUEST_DEMAND_LIST } from "../../../const";
import { toObservable } from "@angular/core/rxjs-interop";
import { withDevtools } from "@angular-architects/ngrx-toolkit";

// RightsChangeRequirementItem
const rightChangeConfig = entityConfig({
	entity: type<RightsChangeRequirementItem>(),
	collection: 'rightsChangeRequirements',
	selectId: (item: RightsChangeRequirementItem) => item.compID
})

export const RightChangeStore = signalStore(
	withEntities(rightChangeConfig),
	withState(initialRightChangeSlice),
	withComputed(store => {
		const visibleItems = computed(() => store.rightsChangeRequirementsEntities())
		return { visibleItems }
	}),
	withProps(_ => ({
		_queryClient: inject(QueryClient),
		_messageService: inject(MessageService),
		_rightsChangeRequirementsService: inject(RightsChangeRequirementsService),
	})),

	withMethods(store => {
		// loadRightChang now supports an optional page parameter; it creates a per-page query and subscribes once
		const loadRightChang = (page = '') => {
			const _rightsQuery = injectQuery(() => ({
				queryKey: [ ...RIGHTS_CHANGE_REQUEST_DEMAND_LIST, page ],
				queryFn: () => store._rightsChangeRequirementsService.getRightsRequest(page),
				staleTime: 1000 * 60 * 5,
				refetchOnWindowFocus: false,
				refetchOnReconnect: false
			}))

			// subscribe only once (take(1)) so we write to the store only on the first successful fetch for this page .pipe(take(1))
			toObservable(_rightsQuery.data).subscribe({
				next: (data) => {
					if (data?.status === 'success' && data.data) {
						patchState(store, setAllEntities(data.data, rightChangeConfig))
					}
				},
				error: (error) => {
					console.error('Error loading rights change requests:', error)
					store._messageService.add({
						severity: 'error',
						summary: '錯誤',
						detail: '載入權益異動需求清單失敗，請稍後再試。',
						life: 3000
					})
				}
			})
		}

		return {
			loadRightChang
		}
	}),
	withHooks(store => ({
		onInit() {
			// autoload first page on init
			store.loadRightChang('')
		}
	})),
	withDevtools('RightChange-store')
)