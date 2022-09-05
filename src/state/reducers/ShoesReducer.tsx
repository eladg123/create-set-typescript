import { ShoesActions } from '../actions/ShoesIndex'
import { ShoesActionTypes } from '../constants-types/ShoesIndex'

export type ShoesType = {
  id: number
  type: string
  color: string
  size: number
  brand: string
}

export type ShoesStateType = {
  availableShoes: []
  errMsg: string
  recommendedShoes: []
}

export const ShoesReducer = (
  state: ShoesStateType = {
    availableShoes: [],
    errMsg: '',
    recommendedShoes: [],
  },
  action: ShoesActions,
) => {
  switch (action.type) {
    case ShoesActionTypes.FETCH_AVAILABLE_SHOES:
      return { ...state, availableShoes: action.payload }
    case ShoesActionTypes.FETCH_RECOMMENDED_SHOES:
      return { ...state, recommendedShoes: action.payload }
    case ShoesActionTypes.REMOVE_SHOES_BY_ID:
      return {
        ...state,
        availableShoes: state.availableShoes.filter(
          (shoes: ShoesType) => shoes.id != action.payload,
        ),
      }
    case ShoesActionTypes.ADD_ERROR:
      return { ...state, errMsg: action.payload }
    case ShoesActionTypes.CLEAR_ERROR:
      return { ...state, errMsg: '' }
    default:
      return state
  }
}
