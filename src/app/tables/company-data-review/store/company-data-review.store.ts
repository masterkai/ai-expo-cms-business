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
import { initialCompanyDataReviewSlice } from "./company-data-review.slice";
import { entityConfig, setAllEntities, withEntities } from "@ngrx/signals/entities";
import { CompanyUpdateReviewItem, CompanyUpdateReviewService } from "../../../services/company-update-review.service";
import { computed, inject } from "@angular/core";
import { injectQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { MessageService } from "primeng/api";
import { COMPANY_UPDATE_REVIEW_LIST, } from "../../../const";
import { toObservable } from "@angular/core/rxjs-interop";
import { withDevtools } from "@angular-architects/ngrx-toolkit";
import * as updaters from "./company-data-review.updaters";

const companyReviewDATAConfig = entityConfig(
	{
		entity: type<CompanyUpdateReviewItem>(),
		collection: 'companyDataReviewList',
		selectId: (item: CompanyUpdateReviewItem) => item.compID
	}
)
export const CompanyDataReviewStore = signalStore(
	withEntities(companyReviewDATAConfig),
	withState(initialCompanyDataReviewSlice),
	withComputed(store => {
		const visibleItems = computed(() => store.companyDataReviewListEntities())
		return { visibleItems }
	}),
	withProps(_ => ({
		_queryClient: inject(QueryClient),
		_messageService: inject(MessageService),
		_companyUpdateReviewService: inject(CompanyUpdateReviewService),
	})),

	withMethods(store => {
		// loadRightChang now supports an optional page parameter; it creates a per-page query and subscribes once
		const loadCompanyUpdateList = (page = '') => {
			const _rightsQuery = injectQuery(() => ({
				queryKey: [ ...COMPANY_UPDATE_REVIEW_LIST, page ],
				queryFn: () => store._companyUpdateReviewService.getReviewRequest(page),
				staleTime: 1000 * 60 * 5,
				refetchOnWindowFocus: false,
				refetchOnReconnect: false
			}))

			// subscribe only once (take(1)) so we write to the store only on the first successful fetch for this page .pipe(take(1))
			toObservable(_rightsQuery.data).subscribe({
				next: (data) => {
					if (data?.status === 'success' && data.data) {
						patchState(store, setAllEntities(data.data, companyReviewDATAConfig))
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

		const setIsDialogVisible = (visible: boolean) => patchState(store, updaters.setIsDialogVisible(visible))

		const setCurrentReview = (review: any | null) => patchState(store, { current_review: review })

		return {
			loadCompanyUpdateList,
			setIsDialogVisible,
			setCurrentReview
		}
	}),
	withHooks(store => ({
		onInit() {
			store.loadCompanyUpdateList('')
		}
	})),
	withDevtools('CompanyDataReviewStore')
)