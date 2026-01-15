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
import {
	CompanyUpdatePayload,
	CompanyUpdateReviewItem,
	CompanyUpdateReviewService,
	HistoryReviewItem
} from "../../../services/company-update-review.service";
import { computed, inject } from "@angular/core";
import { injectQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { MessageService } from "primeng/api";
import { CACHE_KEY_COMPANY_UPDATE_REVIEW_LIST, } from "../../../const";
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
				queryKey: [...CACHE_KEY_COMPANY_UPDATE_REVIEW_LIST, page],
				queryFn: () => store._companyUpdateReviewService.getReviewRequest(page),
				staleTime: 1000 * 60 * 5,
				refetchOnWindowFocus: false,
				refetchOnReconnect: false
			}))

			// subscribe only once (take(1)) so we write to the store only on the first successful fetch for this page .pipe(take(1))
			toObservable(_rightsQuery.data).subscribe({
				next: (data) => {
					if (data?.status === 'success' && data.data) {
						setEmpno(data.empno)
						setDepartID(data.departid)
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

		const onSentReview = (compID: string) => {
			store._companyUpdateReviewService.setSend(compID).subscribe({
				next: (response) => {
					if (response.status === 'success') {
						store._queryClient.invalidateQueries({
							queryKey: CACHE_KEY_COMPANY_UPDATE_REVIEW_LIST
						}).then(() => {
							store._messageService.add({
								severity: 'success',
								summary: '成功',
								detail: '送出審核成功。',
								life: 3000
							})
						})
					} else {
						store._messageService.add({
							severity: 'error',
							summary: '錯誤',
							detail: '送出審核失敗，請稍後再試。',
							life: 3000
						})
					}
				},
				error: (error) => {
					console.error('Error sending review:', error)
					store._messageService.add({
						severity: 'error',
						summary: '錯誤',
						detail: '送出審核失敗，請稍後再試。',
						life: 3000
					})
				}
			})
		}

		const setIsDialogVisible = (visible: boolean) => patchState(store, updaters.setIsDialogVisible(visible))

		const setCurrentReview = (review: CompanyUpdateReviewItem | null) => patchState(store, updaters.setCurrentReview(review))

		const resetCurrentReview = () => patchState(store, updaters.resetCurrentReview())

		const setCurrentReviewDATA = (data: CompanyUpdatePayload[]) => patchState(store, updaters.setCurrentReviewDATA(data))

		const resetCurrentReviewDATA = () => patchState(store, updaters.resetCurrentReviewDATA())

		const fetchReviewDATAById = (id: string) => {
			store._companyUpdateReviewService.getReview(id).subscribe({
				next: (response) => {
					if (response.status === 'success' && response.data) {
						patchState(store, updaters.setCurrentReviewDATA(response.data))
					}
				},
				error: (error) => {
					console.error('Error fetching review data by ID:', error)
					store._messageService.add({
						severity: 'error',
						summary: '錯誤',
						detail: '載入審核資料失敗，請稍後再試。',
						life: 3000
					})
				}
			})

		}

		const setHistoryReviewDATA = (data: HistoryReviewItem[]) => patchState(store, updaters.setHistoryReviewDATA(data))

		const setEmpno = (empno: string) => patchState(store, updaters.setEmpno(empno))

		const setDepartID = (departID: string) => patchState(store, updaters.setDepartID(departID))


		return {
			loadCompanyUpdateList,
			setIsDialogVisible,
			setCurrentReview,
			resetCurrentReview,
			setCurrentReviewDATA,
			resetCurrentReviewDATA,
			fetchReviewDATAById,
			setHistoryReviewDATA,
			onSentReview,
			setEmpno,
			setDepartID
		}
	}),
	withHooks(store => ({
		onInit() {
			store.loadCompanyUpdateList('')
		}
	})),
	withDevtools('CompanyDataReviewStore')
)