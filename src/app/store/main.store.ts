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
import { Company, Exhibition_rights, initialMainSlice, Selected_Exhibition_rights } from "./main.slice";
import { computed, inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { ExhibitorService } from "../services/exhibitor.service";
import { ExhibitionRightsService, RightsDATAParam } from "../services/exhibition-rights-service";
import * as updaters from "./main.updaters";
import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { injectQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { entityConfig, setAllEntities, updateEntity, withEntities } from "@ngrx/signals/entities";
import { CACHE_KEY_COMPANY_LIST } from "../const";
import { toObservable } from "@angular/core/rxjs-interop";

const companyConfig = entityConfig({
	entity: type<Company>(),
	collection: 'companies',
	selectId: (company: Company) => company.unified_business_no
})

export const MainStore = signalStore(
	withEntities(companyConfig),
	withState(initialMainSlice),
	withComputed(store => {
		const visibleCompanies = computed(() => store.companiesEntities())
		return {
			visibleCompanies
		}
	}),
	withProps(_ => ({
		_queryClient: inject(QueryClient),
		_messageService: inject(MessageService),
		_exhibitorService: inject(ExhibitorService),
		_exhibitionRightsService: inject(ExhibitionRightsService),
	})),
	withMethods(store => {
		const setExhibitionRights = (rights: Exhibition_rights) => patchState(store, updaters.setExhibitionRights(rights));

		const _companyDATAQuery = injectQuery(() => ({
			queryKey: CACHE_KEY_COMPANY_LIST,
			queryFn: () => store._exhibitorService.getCompany(),
			staleTime: 1000 * 60 * 5, // 5 minutes
			refetchOnWindowFocus: false,
			refetchOnReconnect: false
		}))

		const updateCompanyData = () => {
			const compID = store.current_company()?.unified_business_no
			const selected_exhibition_right = store.selected_exhibition_right()
			patchState(store, updateEntity({
					id: compID ?? '',
					changes: {
						...selected_exhibition_right
					}
				}, companyConfig
			))
		};

		const loadCompanies = () => {
			toObservable(_companyDATAQuery.data).subscribe({
				next: (data) => {
					if (data?.status === 'success' && data.data) {
						const companies = data.data
						patchState(store, setAllEntities(companies, companyConfig))
					}
				},
				error: (error) => {
					console.error('Error loading companies:', error);
					store._messageService.add({
						severity: 'error',
						summary: '錯誤',
						detail: '載入公司資料時發生錯誤，請稍後再試。',
						life: 3000
					})
				}
			})
		}

		const getExhibitionRights = (data: RightsDATAParam) => {
			store._exhibitionRightsService.getRights({ id: data.id, type: data.type }).subscribe({
				next: (response) => {
					if (response.status === 'success' && response.data) {
						const data = {
							sponsor_benefits: response.data.rights,
							lecture: response.data.lecture,
							optional: response.data.optional,
							promotion: response.data.promotion,
							booth: response.data.booth,
							stage: response.data.stage,
						}
						patchState(store, updaters.setExhibitionRights(data));
					}
				},
				error: (error) => {
					console.error('Error fetching exhibition rights:', error);
					store._messageService.add({
						severity: 'error',
						summary: '錯誤',
						detail: '取得展覽權益資料時發生錯誤，請稍後再試。',
						life: 3000
					})
				}
			})
		}
		const setSelectedExhibitionRights = (partialSelectedRights: Partial<Selected_Exhibition_rights>) => patchState(store, updaters.setSelectedExhibitionRights(partialSelectedRights));

		const setIsDialogVisible = (visible: boolean) => patchState(store, updaters.setIsDialogVisible(visible));

		const setCurrentCompany = (company: Company | null) => patchState(store, updaters.setCurrentCompany(company));

		return {
			setExhibitionRights,
			setSelectedExhibitionRights,
			getExhibitionRights,
			setIsDialogVisible,
			loadCompanies,
			setCurrentCompany,
			updateCompanyData,
			resetSelectedExhibitionRights: () => patchState(store, updaters.resetSelectedExhibitionRights())
		}
	}),
	withHooks(store => ({
		onInit() {
			store.loadCompanies()
		}
	})),
	withDevtools('main-store')
)