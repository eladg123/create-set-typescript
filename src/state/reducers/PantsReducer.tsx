import { PantsActions } from '../actions/PantsIndex'
import { PantsActionTypes } from '../constants-types/PantsIndex'

export type PantsType = {
  id: number
  type: string
  color: string
  size: number
  brand: string
}

export type PantsStateType = {
  availablePants: []
  errMsg: string
  recommendedPants: []
}

export const PantsReducer = (
  state: PantsStateType = {
    availablePants: [],
    errMsg: '',
    recommendedPants: [],
  },
  action: PantsActions,
) => {
  switch (action.type) {
    case PantsActionTypes.FETCH_AVAILABLE_PANTS:
      return { ...state, availablePants: action.payload }
    case PantsActionTypes.FETCH_RECOMMENDED_PANTS:
      return { ...state, recommendedPants: action.payload }
    case PantsActionTypes.REMOVE_PANTS_BY_ID:
      return {
        ...state,
        availablePants: state.availablePants.filter(
          (pants: PantsType) => pants.id != action.payload,
        ),
      }
    case PantsActionTypes.ADD_ERROR:
      return { ...state, errMsg: action.payload }
    case PantsActionTypes.CLEAR_ERROR:
      return { ...state, errMsg: '' }
    default:
      return state
  }
}
