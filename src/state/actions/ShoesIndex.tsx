import { ShoesActionTypes } from '../constants-types/ShoesIndex'
import { ShoesType } from '../reducers/ShoesReducer'

interface actionFetchAvailableShoes {
  type: ShoesActionTypes.FETCH_AVAILABLE_SHOES
  payload: ShoesType[]
}

interface actionAddError {
  type: ShoesActionTypes.ADD_ERROR
  payload: string
}

interface actionClearError {
  type: ShoesActionTypes.CLEAR_ERROR
}

interface actionFetchRecommendedShoes {
  type: ShoesActionTypes.FETCH_RECOMMENDED_SHOES
  payload: ShoesType[]
}

interface actionRemoveShoes {
  type: ShoesActionTypes.REMOVE_SHOES_BY_ID
  payload: number
}

export type ShoesActions =
  | actionAddError
  | actionClearError
  | actionFetchAvailableShoes
  | actionFetchRecommendedShoes
  | actionRemoveShoes
