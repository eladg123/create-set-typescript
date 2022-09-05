import { ShirtsActions } from '../actions/ShirtsIndex'
import { ShirtsActionTypes } from '../constants-types/ShirtsIndex'

export type ShirtType = {
  id: number
  type: string
  color: string
  size: string
  brand: string
}

export type ShirtsStateType = {
  availableShirts: []
  errMsg: string
  recommendedShirts: []
}

export const ShirtsReducer = (
  state: ShirtsStateType = {
    availableShirts: [],
    errMsg: '',
    recommendedShirts: [],
  },
  action: ShirtsActions,
) => {
  switch (action.type) {
    case ShirtsActionTypes.FETCH_AVAILABLE_SHIRTS:
      return { ...state, availableShirts: action.payload }
    case ShirtsActionTypes.FETCH_RECOMMENDED_SHIRTS:
      return { ...state, recommendedShirts: action.payload }
    case ShirtsActionTypes.REMOVE_SHIRT_BY_ID:
      return {
        ...state,
        availableShirts: state.availableShirts.filter(
          (shirt: ShirtType) => shirt.id != action.payload,
        ),
      }
    case ShirtsActionTypes.ADD_ERROR:
      return { ...state, errMsg: action.payload }
    case ShirtsActionTypes.CLEAR_ERROR:
      return { ...state, errMsg: '' }
    default:
      return state
  }
}
