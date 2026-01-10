import { signalStore, type, withState } from "@ngrx/signals";
import { initialRightChangeSlice } from "./right-change.slice";
import { entityConfig, withEntities } from "@ngrx/signals/entities";
import { RightsChangeRequirementItem } from "../../../services/rights-change-requirements.service";
// RightsChangeRequirementItem
const rightChangeConfig = entityConfig({
	entity: type<RightsChangeRequirementItem>(),
	collection: 'rightsChangeRequirements',
	selectId: (item: RightsChangeRequirementItem) => item.compID
})

export const RightChangeStore = signalStore(
	withEntities(rightChangeConfig),
	withState(initialRightChangeSlice)
)