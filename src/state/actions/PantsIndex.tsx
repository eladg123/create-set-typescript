import { PantsActionTypes } from '../constants-types/PantsIndex'
import { PantsType } from '../reducers/PantsReducer'

interface actionFetchAvailablePants {
  type: PantsActionTypes.FETCH_AVAILABLE_PANTS
  payload: PantsType[]
}

interface actionAddError {
  type: PantsActionTypes.ADD_ERROR
  payload: string
}

interface actionClearError {
  type: PantsActionTypes.CLEAR_ERROR
}

interface actionFetchRecommendedPants {
  type: PantsActionTypes.FETCH_RECOMMENDED_PANTS
  payload: PantsType[]
}

interface actionRemovePants {
  type: PantsActionTypes.REMOVE_PANTS_BY_ID
  payload: number
}

export type PantsActions =
  | actionAddError
  | actionClearError
  | actionFetchAvailablePants
  | actionFetchRecommendedPants
  | actionRemovePants
