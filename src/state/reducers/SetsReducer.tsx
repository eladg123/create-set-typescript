import { SetsActions } from '../actions/SetsIndex'
import { SetsActionTypes } from '../constants-types/SetsIndex'
import { PantsType } from './PantsReducer'
import { ShirtType } from './ShirtsReducer'
import { ShoesType } from './ShoesReducer'

export type SetType = {
  timeToCreate: string
  createdAt: string
  id: number
  shirt: ShirtType
  pants: PantsType
  shoes: ShoesType
}

export type SetsStateType = {
  sets: SetType[]
  errMsg: string
  chosenShirt: null | ShirtType
  chosenShoes: null | ShoesType
  chosenPants: null | PantsType
}

export const SetsReducer = (
  state: SetsStateType = {
    sets: [],
    errMsg: '',
    chosenPants: null,
    chosenShirt: null,
    chosenShoes: null,
  },
  action: SetsActions,
) => {
  switch (action.type) {
    case SetsActionTypes.FETCH_SETS:
      return { ...state, sets: action.payload }
    case SetsActionTypes.CREATE_SET:
      return {
        ...state,
        sets: [...state.sets, action.payload],
        chosenShirt: null,
        chosenPants: null,
        chosenShoes: null,
      }
    case SetsActionTypes.DELETE_SET_BY_ID:
      return {
        ...state,
        sets: state.sets.filter((set: SetType) => set.id !== action.payload),
      }
    case SetsActionTypes.CHOOSE_SHIRT:
      return {
        ...state,
        chosenShirt: action.payload,
      }
    case SetsActionTypes.CHOOSE_PANTS:
      return {
        ...state,
        chosenPants: action.payload,
      }
    case SetsActionTypes.CHOOSE_SHOES:
      return {
        ...state,
        chosenShoes: action.payload,
      }
    case SetsActionTypes.ADD_ERROR:
      return { ...state, errMsg: action.payload }
    case SetsActionTypes.CLEAR_ERROR:
      return { ...state, errMsg: '' }
    default:
      return state
  }
}
