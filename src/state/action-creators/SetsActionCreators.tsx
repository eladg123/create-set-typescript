import { publicAPI } from '../../api/Server'
import { SetsActions } from '../actions/SetsIndex'
import { SetsActionTypes } from '../constants-types/SetsIndex'
import { SetType } from '../reducers/SetsReducer'
import { Dispatch } from 'react'
import { AxiosResponse } from 'axios'
import { takeTheCurrentDate } from '../../utils/TakeTheCurrentDate'
import { ShirtType } from '../reducers/ShirtsReducer'
import { PantsType } from '../reducers/PantsReducer'
import { ShoesType } from '../reducers/ShoesReducer'

export const fetchSets = () => {
  return async (dispatch: Dispatch<SetsActions>) => {
    try {
      let setsLocalData: any = localStorage.getItem('sets')
      if (setsLocalData) {
        setsLocalData = JSON.parse(setsLocalData)
        dispatch({ type: SetsActionTypes.FETCH_SETS, payload: setsLocalData })
      }
    } catch (error) {
      dispatch({
        type: SetsActionTypes.ADD_ERROR,
        payload: 'Sets not available',
      })
    }
  }
}

export const deleteSetById = (setId: number) => {
  return async (dispatch: Dispatch<SetsActions>) => {
    try {
      dispatch({ type: SetsActionTypes.DELETE_SET_BY_ID, payload: setId })
      let setsLocalData: any = localStorage.getItem('sets')
      setsLocalData = JSON.parse(setsLocalData)
      let shirtsLocalData: any = localStorage.getItem('availableShirts')
      shirtsLocalData = JSON.parse(shirtsLocalData)
      let pantsLocalData: any = localStorage.getItem('availablePants')
      pantsLocalData = JSON.parse(pantsLocalData)
      let shoesLocalData: any = localStorage.getItem('availableShoes')
      shoesLocalData = JSON.parse(shoesLocalData)
      let setToDelete: SetType = setsLocalData.find(
        (set: SetType) => (set.id = setId),
      )
      pantsLocalData.push(setToDelete.pants)
      shoesLocalData.push(setToDelete.shoes)
      shirtsLocalData.push(setToDelete.shirt)
      localStorage.setItem('availableShoes', JSON.stringify(shoesLocalData))
      localStorage.setItem('availableShirts', JSON.stringify(shirtsLocalData))
      localStorage.setItem('availablePants', JSON.stringify(pantsLocalData))
      let updatedSetsLocalData: Object[] = setsLocalData.filter(
        (set: SetType) => set.id !== setId,
      )
      if (updatedSetsLocalData.length == 0) {
        let initialArray: [] | string = []
        initialArray = JSON.stringify(initialArray)
        localStorage.setItem('sets', initialArray)
      } else if (updatedSetsLocalData.length > 0) {
        localStorage.setItem('sets', JSON.stringify(updatedSetsLocalData))
      }
    } catch (error) {
      dispatch({
        type: SetsActionTypes.ADD_ERROR,
        payload: 'Cannot delete now, try again later',
      })
    }
  }
}

export const createNewSet = (
  shirt: ShirtType,
  pants: PantsType,
  shoes: ShoesType,
) => {
  return async (dispatch: Dispatch<SetsActions>) => {
    try {
      let setsLocalData: any = localStorage.getItem('sets')
      setsLocalData = JSON.parse(setsLocalData)
      const finishTime: string = takeTheCurrentDate()
      let startTime: any = localStorage.getItem('startCreateTime')
      let finishTimeLocal: any = localStorage.getItem('finishTime')
      startTime = Date.parse(startTime)
      finishTimeLocal = Date.parse(finishTimeLocal)
      const timeTakenInMili: number = finishTimeLocal - startTime
      let minutes: number = Math.floor(timeTakenInMili / 6000)
      let seconds: any = ((timeTakenInMili % 6000) / 1000).toFixed(0)
      const newSet: SetType = {
        timeToCreate: minutes + ':' + (seconds < 10 ? '0' : '') + seconds,
        createdAt: finishTime,
        id: shirt.id + shoes.id + pants.id,
        shirt: shirt,
        pants: pants,
        shoes: shoes,
      }
      if (setsLocalData) {
        setsLocalData = [...setsLocalData, newSet]
        localStorage.setItem('sets', JSON.stringify(setsLocalData))
      } else {
        let newSetsArray = [newSet]
        localStorage.setItem('sets', JSON.stringify(newSetsArray))
      }
      localStorage.removeItem('chosenShirt')
      localStorage.removeItem('chosenPants')
      localStorage.removeItem('chosenShoes')
      dispatch({ type: SetsActionTypes.CREATE_SET, payload: newSet })
    } catch (error) {
      dispatch({
        type: SetsActionTypes.ADD_ERROR,
        payload: 'Cannot create now, try again later',
      })
    }
  }
}

export const clearErrorMessage = () => {
  return (dispatch: Dispatch<SetsActions>) => {
    dispatch({ type: SetsActionTypes.CLEAR_ERROR })
  }
}

export const chooseShirt = (shirt: ShirtType) => {
  return (dispatch: Dispatch<SetsActions>) => {
    localStorage.setItem('chosenShirt', JSON.stringify(shirt))
    dispatch({ type: SetsActionTypes.CHOOSE_SHIRT, payload: shirt })
  }
}

export const chooseShoes = (shoes: ShoesType) => {
  return (dispatch: Dispatch<SetsActions>) => {
    localStorage.setItem('chosenShoes', JSON.stringify(shoes))
    dispatch({ type: SetsActionTypes.CHOOSE_SHOES, payload: shoes })
  }
}

export const choosePants = (pants: PantsType) => {
  return (dispatch: Dispatch<SetsActions>) => {
    localStorage.setItem('chosenPants', JSON.stringify(pants))
    dispatch({ type: SetsActionTypes.CHOOSE_PANTS, payload: pants })
  }
}
