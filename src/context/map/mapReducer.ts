import { TMapAction, TMapContext } from "@/types"

const mapReducer = (state:TMapContext, action: TMapAction): TMapContext => {
  switch(action.type) {
    case 'SET_ZOOM':
      return {
        ...state,
        zoom: action.zoom
      }
  }
  const _exhaustiveCheck: never = action.type
  return state
}
export default mapReducer