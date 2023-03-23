import { TSelectionAction, TSelectionContext } from "@/types"

const selectionReducer = (state:TSelectionContext, action: TSelectionAction): TSelectionContext => {
  switch(action.type) {
    case 'SELECT_STAR':
      return {
        ...state,
        selectedStar: action.star,
        drawerOpen: true
      }
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawerOpen: typeof action.drawerOpen == 'undefined' ? !state.drawerOpen : action.drawerOpen
      }
  }
  return state
}
export default selectionReducer