import { publicAPI } from '../../api/Server'
import { PantsActions } from '../actions/PantsIndex'
import { PantsActionTypes } from '../constants-types/PantsIndex'
import { PantsType } from '../reducers/PantsReducer'
import { Dispatch } from 'redux'
import { AxiosResponse } from 'axios'
import { recommendPantsUtils } from '../../utils/RecommendItems'
import { Pants, Shirt } from '../interfaces'

export const fetchAvailablePants = () => {
  return async (dispatch: Dispatch<PantsActions>) => {
    try {
      let pantsLocalData: any = localStorage.getItem('availablePants')
      pantsLocalData = JSON.parse(pantsLocalData)
      if (pantsLocalData) {
        dispatch({
          type: PantsActionTypes.FETCH_AVAILABLE_PANTS,
          payload: pantsLocalData,
        })
      } else {
        const response: AxiosResponse = await publicAPI.get('/')
        if (response.data) {
          localStorage.setItem(
            'availablePants',
            JSON.stringify(
              response.data.filter(
                (product: PantsType) => product.type === 'pants',
              ),
            ),
          )
        }
      }
    } catch (error) {
      dispatch({
        type: PantsActionTypes.ADD_ERROR,
        payload: 'Pants not available',
      })
    }
  }
}

export const clearErrorMessage = () => {
  return (dispatch: Dispatch<PantsActions>) => {
    dispatch({ type: PantsActionTypes.CLEAR_ERROR })
  }
}

export const removeAvailablePantsById = (pantsId: number) => {
  return (dispatch: Dispatch<PantsActions>) => {
    try {
      let pantsLocalData: any = localStorage.getItem('availablePants')
      pantsLocalData = JSON.parse(pantsLocalData)
      pantsLocalData = pantsLocalData.filter(
        (pants: PantsType) => pants.id !== pants.id,
      )
      localStorage.setItem('availablePants', JSON.stringify(pantsLocalData))
      dispatch({
        type: PantsActionTypes.REMOVE_PANTS_BY_ID,
        payload: pantsId,
      })
    } catch (error) {
      dispatch({
        type: PantsActionTypes.ADD_ERROR,
        payload: 'Cant remove this pants id',
      })
    }
  }
}

export const recommendPants = () => {
  return (dispatch: Dispatch<PantsActions>) => {
    try {
      let chosenShirtSTRING = localStorage.getItem('chosenShirt')
      let availablePantsSTRING = localStorage.getItem('availablePants')
      if (chosenShirtSTRING && availablePantsSTRING) {
        let chosenShirt: Shirt = JSON.parse(chosenShirtSTRING)
        let availablePants: Pants[] = JSON.parse(availablePantsSTRING)
        const response = recommendPantsUtils(
          { color: chosenShirt.color, size: chosenShirt.size },
          availablePants,
        )
        dispatch({
          type: PantsActionTypes.FETCH_RECOMMENDED_PANTS,
          payload: response,
        })
      }
    } catch (error) {
      dispatch({
        type: PantsActionTypes.ADD_ERROR,
        payload: 'No items to recommend',
      })
    }
  }
}
