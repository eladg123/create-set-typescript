import { SetsActionTypes } from '../constants-types/SetsIndex'
import { ShirtType } from '../reducers/ShirtsReducer'
import { PantsType } from '../reducers/PantsReducer'
import { ShoesType } from '../reducers/ShoesReducer'

interface actionFetchSets {
  type: SetsActionTypes.FETCH_SETS
  payload: Object[]
}

interface actionAddError {
  type: SetsActionTypes.ADD_ERROR
  payload: string
}

interface actionCreateSet {
  type: SetsActionTypes.CREATE_SET
  payload: { shirt: ShirtType; pants: PantsType; shoes: ShoesType; id: number }
}

interface actionChooseShirt {
  type: SetsActionTypes.CHOOSE_SHIRT
  payload: ShirtType
}

interface actionChooseShoes {
  type: SetsActionTypes.CHOOSE_SHOES
  payload: ShoesType
}

interface actionChoosePants {
  type: SetsActionTypes.CHOOSE_PANTS
  payload: PantsType
}

interface actionRemoveSet {
  type: SetsActionTypes.DELETE_SET_BY_ID
  payload: number
}

interface actionClearError {
  type: SetsActionTypes.CLEAR_ERROR
}

export type SetsActions =
  | actionClearError
  | actionChoosePants
  | actionChooseShoes
  | actionChooseShirt
  | actionCreateSet
  | actionAddError
  | actionFetchSets
  | actionRemoveSet
