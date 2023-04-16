import { TSelectionAction, TSelectionContext } from "@/types"

const selectionReducer = (state:TSelectionContext, action: TSelectionAction): TSelectionContext => {
  switch(action.type) {
    case 'SET_NAMED_STARS':
      return {
        ...state,
        namedStars: action.namedStars
      }
    case 'SELECT_STAR':
      return {
        ...state,
        selectedStar: action.star,
        drawerOpen: true
      }
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawerOpen: !state.drawerOpen
      }
    case 'SELECT_CONSTELLATIONS':
      return {
        ...state,
        selectedConstellations: action.constellations
      }
  }
  const _exhaustiveCheck: never = action
  return state
}
export default selectionReducer