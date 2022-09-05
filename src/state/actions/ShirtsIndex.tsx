import { ShirtsActionTypes } from '../constants-types/ShirtsIndex'
import { ShirtType } from '../reducers/ShirtsReducer'

interface actionFetchAvailableShirts {
  type: ShirtsActionTypes.FETCH_AVAILABLE_SHIRTS
  payload: ShirtType[]
}

interface actionAddError {
  type: ShirtsActionTypes.ADD_ERROR
  payload: string
}

interface actionClearError {
  type: ShirtsActionTypes.CLEAR_ERROR
}

interface actionFetchRecommendedShirts {
  type: ShirtsActionTypes.FETCH_RECOMMENDED_SHIRTS
  payload: ShirtType[]
}

interface actionRemoveShirt {
  type: ShirtsActionTypes.REMOVE_SHIRT_BY_ID
  payload: number
}

export type ShirtsActions =
  | actionAddError
  | actionClearError
  | actionFetchAvailableShirts
  | actionFetchRecommendedShirts
  | actionRemoveShirt
