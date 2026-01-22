import {
	getState,
	patchState,
	signalStore,
	type,
	withComputed,
	withHooks,
	withMethods,
	withProps,
	withState
} from "@ngrx/signals";
import { BoothStyles, Company, Exhibition_rights, initialMainSlice, Selected_Exhibition_rights } from "./main.slice";
import { computed, effect, inject, Injector, runInInjectionContext } from "@angular/core";
import { MessageService } from "primeng/api";
import { ExhibitorService } from "../../../services/exhibitor.service";
import {
	ExhibitionRightsService,
	GetRightsParam,
	Option,
	RightItem
} from "../../../services/exhibition-rights-service";
import * as updaters from "./main.updaters";
import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { injectQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { entityConfig, setAllEntities, updateEntity, withEntities } from "@ngrx/signals/entities";
import { CACHE_KEY_COMPANY_LIST, CACHE_KEY_RIGHTS_CHANGE_REQUEST_DEMAND_LIST } from "../../../const";
import { toObservable } from "@angular/core/rxjs-interop";
import { RightChangeStore } from "../../rights-change-requirements/store/right-change.store";
import { getHighestSponsorship } from "./main.helpers";

const companyConfig = entityConfig({
	entity: type<Company>(),
	collection: 'companies',
	selectId: (company: Company) => company.unified_business_no
})

export const MainStore = signalStore(
	withEntities(companyConfig),
	withState(initialMainSlice),
	withProps(_ => ({
		_queryClient: inject(QueryClient),
		_messageService: inject(MessageService),
		_exhibitorService: inject(ExhibitorService),
		_exhibitionRightsService: inject(ExhibitionRightsService),
		_rightChangeStore: inject(RightChangeStore),
		_injector: inject(Injector),
		// 攤位樣式(設計，標準，素地，新創)
		boothStyles: [
			{ name: '設計', code: 'design' },
			{ name: '標準', code: 'standard' },
			{ name: '素地', code: 'raw' },
			{ name: '新創', code: 'startup' }
		] as BoothStyles[]
	})),
	withComputed(store => {
		const visibleCompanies = computed(() => store.companiesEntities())
		const sponsorships = computed(() => getHighestSponsorship(store.selected_exhibition_right()))
		const isRightChangeModeEnabled = computed(() => store._rightChangeStore.right_change_mode())
		return {
			visibleCompanies,
			isRightChangeModeEnabled,
			sponsorships
		}
	}),
	withMethods(store => {
		const setExhibitionRights = (rights: Exhibition_rights) => patchState(store, updaters.setExhibitionRights(rights));

		const onGetLink = (unino: string) => {
			store._exhibitionRightsService.getLink(unino).subscribe({
				next: (response) => {
					if (response.status === 'success') {
						store._messageService.add({
							severity: 'success',
							summary: '成功',
							detail: `展覽連結取得成功：${response.message}`,
							life: 5000
						})

					} else {
						store._messageService.add({
							severity: 'error',
							summary: '錯誤',
							detail: '取得展覽連結失敗，請稍後再試。',
							life: 3000
						})
					}
				},
				error: (error) => {
					console.error('Error getting exhibition link:', error);
					store._messageService.add({
						severity: 'error',
						summary: '錯誤',
						detail: '取得展覽連結時發生錯誤，請稍後再試。',
						life: 3000
					})
				}
			})
		}

		const setEmpno = (empno: string) => patchState(store, updaters.setEmpno(empno));

		const setDepartID = (departID: string) => patchState(store, updaters.setDepartID(departID));

		const _companyDATAQuery = runInInjectionContext(store._injector, () => injectQuery(() => ({
			queryKey: CACHE_KEY_COMPANY_LIST,
			queryFn: () => store._exhibitorService.getCompany(),
			staleTime: 1000 * 60 * 5, // 5 minutes
			refetchOnWindowFocus: false,
			refetchOnReconnect: false
		})))

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

		const onSetExhibitionLink = () => {
			const compID = store.current_compID()
			if (!compID) {
				store._messageService.add({
					severity: 'error',
					summary: '錯誤',
					detail: '無效的公司ID，無法重新產生展覽連結。',
					life: 3000
				})
				return
			}
			store._exhibitionRightsService.setLink(compID).subscribe({
				next: (response) => {
					if (response.status === 'success') {

						store._queryClient.invalidateQueries(
							{ queryKey: CACHE_KEY_COMPANY_LIST }
						).then(
							() => {
								store._messageService.add({
									severity: 'success',
									summary: '成功',
									detail: '展覽連結已重新產生。',
									life: 3000
								})
							}
						)
					} else {
						store._messageService.add({
							severity: 'error',
							summary: '錯誤',
							detail: '重新產生展覽連結失敗，請稍後再試。',
							life: 3000
						})
					}
				},
				error: (error) => {
					console.error('Error setting exhibition link:', error);
					store._messageService.add({
						severity: 'error',
						summary: '錯誤',
						detail: '重新產生展覽連結時發生錯誤，請稍後再試。',
						life: 3000
					})
				}
			})
		}

		const loadCompanies = () => {
			toObservable(_companyDATAQuery.data).subscribe({
				next: (data) => {
					if (data?.status === 'success' && data.data) {
						setEmpno(data.empno)
						setDepartID(data.departid)
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

		const setCurrentCompID = (compID: string | null) => patchState(store, updaters.setCurrentCompID(compID))

		const getExhibitionRights = (data: GetRightsParam) => {
			store._exhibitionRightsService.getRights({ id: data.id, type: data.type }).subscribe({
				next: (response) => {
					if (response.status === 'success' && response.data) {
						const data: Exhibition_rights = {
							sponsorship_benefits: response.data.rights,
							lecture: response.data.lecture,
							optional: response.data.optional,
							promotion: response.data.promotion,
							booth: response.data.booth,
							stage: response.data.stage,
						}
						patchState(store, updaters.setExhibitionRights(data));
						setCurrentCompID(response.data.compID)
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

		const onSaveExhibitorRights = () => {
			const compID = store.isRightChangeModeEnabled() ? store._rightChangeStore.current_compID() : store.current_compID();
			const items: RightItem[] = Object.entries(store.selected_exhibition_right()).flatMap(([itemCate, arr]) =>
				arr.map(({ id }: { id: string }) => ({
					id: Number(id),
					itemCate,
					style: itemCate === 'booth' ? store.booth_style() : '',
					grid: itemCate === 'booth' ? store.grid_num() : ''
				}))
			)
			const type = store.isRightChangeModeEnabled() ? 'modify' : '';
			const successMessage = store.isRightChangeModeEnabled() ? '展覽權益變更需求已送出。' : '展覽權益資料已更新。';
			const errorMessage = store.isRightChangeModeEnabled() ? '送出展覽權益變更需求失敗，請稍後再試。' : '更新展覽權益資料失敗，請稍後再試。';

			store._exhibitionRightsService.setRights({
				compID: compID ?? '',
				type,
				items
			}).subscribe({
				next: (response) => {
					if (response.status === 'success') {
						store._queryClient.invalidateQueries({
							queryKey: CACHE_KEY_RIGHTS_CHANGE_REQUEST_DEMAND_LIST
						}).then(() => {
							store._messageService.add({
								severity: 'success',
								summary: '成功',
								detail: successMessage,
								life: 3000
							})
						})

					} else {
						store._messageService.add({
							severity: 'error',
							summary: '錯誤',
							detail: errorMessage,
							life: 3000
						})
					}
				}
			})
		}

		const setBoothStyle = (style: string) => patchState(store, updaters.setBoothStyle(style));

		const setGridNumber = (gridNumber: string) => patchState(store, updaters.setGridNumber(gridNumber));

		const setSelectedExhibitionRights = (partialSelectedRights: Partial<Selected_Exhibition_rights>) => patchState(store, updaters.setSelectedExhibitionRights(partialSelectedRights));

		const setIsDialogVisible = (visible: boolean) => patchState(store, updaters.setIsDialogVisible(visible));

		const setCurrentCompany = (company: Company | null) => patchState(store, updaters.setCurrentCompany(company));

		const getBoothSpec = (compID: string) => {
			return store._exhibitionRightsService.getBoothSpec(compID).subscribe({
				next: (response) => {
					if (response.status === 'success' && response.data.length !== 0) {
						setBoothStyle(response.data[0].style)
						setGridNumber(response.data[0].grid)
					}
				}
			})
		}

		const setSelectedBoothStyle = (style: BoothStyles | null) => patchState(store, updaters.setSelectedBoothStyle(style));

		return {
			setSelectedBoothStyle,
			setExhibitionRights,
			setSelectedExhibitionRights,
			getExhibitionRights,
			getBoothSpec,
			setIsDialogVisible,
			loadCompanies,
			setCurrentCompany,
			updateCompanyData,
			setCurrentCompID,
			onSaveExhibitorRights,
			onSetExhibitionLink,
			resetSelectedExhibitionRights: () => patchState(store, updaters.resetSelectedExhibitionRights()),
			onGetLink,
			setEmpno,
			setDepartID,
			setBoothStyle,
			setGridNumber
		}
	}),
	withHooks(store => ({
		onInit() {
			effect(() => {
				// 👇 The effect is re-executed on state change.
				const state = getState(store);
				const booth_style = state.booth_style;
				if (booth_style !== '') {
					const matchedStyle = store.boothStyles.find(bs => bs.name === booth_style);
					if (matchedStyle) {
						Promise.resolve().then(() => {
							store.setSelectedBoothStyle(matchedStyle);
						});
					}
				} else {
					Promise.resolve().then(() => {
							store.setSelectedBoothStyle({
								name: '',
								code: ''
							});
						}
					);
				}
				console.log('counter state', state);
			});
			store.loadCompanies()

			// when current_company changes, update selected exhibition rights from the company fields
			toObservable(store.current_company).subscribe({
				next: (company) => {
					if (company) {
						const selected: Partial<Selected_Exhibition_rights> = {
							lecture: company.lecture ?? [],
							optional: company.optional ?? [],
							promotion: company.promotion ?? [],
							booth: company.booth ?? [],
							stage: company.stage ?? []
						}
						store.setSelectedExhibitionRights(selected)
					} else {
						// reset when there's no current company selected
						store.resetSelectedExhibitionRights()
					}
				},
				error: (err) => console.error('Error observing current_company:', err)
			})

			// when exhibition_rights (options) are loaded/updated, reconcile selected values so they reference the same option objects
			toObservable(store.exhibition_rights).subscribe({
				next: (rights) => {
					try {
						if (!rights) return;
						const selected = store.selected_exhibition_right()
						// helper to map selected items to the actual option objects from rights by id
						const mapSelected = (items: Option[] | undefined, options: Option[] | undefined) => {
							if (!items || items.length === 0) return undefined
							if (!options || options.length === 0) return undefined
							const mapped = items.map(i => options.find(o => String(o.id) === String((i as any).id) || String(o.option).trim() === String((i as any).option).trim())).filter(Boolean) as Option[]
							return (mapped.length > 0) ? mapped : undefined
						}
						const reconciledPartial: Partial<Selected_Exhibition_rights> = {}
						const lectureMapped = mapSelected(selected.lecture, rights.lecture as Option[])
						if (lectureMapped) reconciledPartial.lecture = lectureMapped
						const optionalMapped = mapSelected(selected.optional, rights.optional as Option[])
						if (optionalMapped) reconciledPartial.optional = optionalMapped
						const promotionMapped = mapSelected(selected.promotion, rights.promotion as Option[])
						if (promotionMapped) reconciledPartial.promotion = promotionMapped
						const boothMapped = mapSelected(selected.booth, rights.booth as Option[])
						if (boothMapped) reconciledPartial.booth = boothMapped
						const stageMapped = mapSelected(selected.stage, rights.stage as Option[])
						if (stageMapped) reconciledPartial.stage = stageMapped

						if (Object.keys(reconciledPartial).length > 0) {
							store.setSelectedExhibitionRights(reconciledPartial)
						}
					} catch (err) {
						console.error('Error reconciling exhibition rights vs selected:', err)
					}
				},
				error: (err) => console.error('Error observing exhibition_rights:', err)
			})
		}
	})),
	withDevtools('main-store')
)
