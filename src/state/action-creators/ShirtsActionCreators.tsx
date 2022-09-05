import { publicAPI } from '../../api/Server'
import { ShirtsActions } from '../actions/ShirtsIndex'
import { ShirtsActionTypes } from '../constants-types/ShirtsIndex'
import { ShirtType } from '../reducers/ShirtsReducer'
import { Dispatch } from 'redux'
import { AxiosResponse } from 'axios'

export const fetchAvailableShirts = () => {
  return async (dispatch: Dispatch<ShirtsActions>) => {
    try {
      let shirtsLocalData: any = localStorage.getItem('availableShirts')
      shirtsLocalData = JSON.parse(shirtsLocalData)
      if (shirtsLocalData) {
        dispatch({
          type: ShirtsActionTypes.FETCH_AVAILABLE_SHIRTS,
          payload: shirtsLocalData,
        })
      } else {
        const response: AxiosResponse = await publicAPI.get('/')
        if (response.data) {
          localStorage.setItem(
            'availableShirts',
            JSON.stringify(
              response.data.filter(
                (product: ShirtType) => product.type === 'shirt',
              ),
            ),
          )
        }
      }
    } catch (error) {
      dispatch({
        type: ShirtsActionTypes.ADD_ERROR,
        payload: 'Shirts not available',
      })
    }
  }
}

export const clearErrorMessage = () => {
  return (dispatch: Dispatch<ShirtsActions>) => {
    dispatch({ type: ShirtsActionTypes.CLEAR_ERROR })
  }
}

export const removeAvailableShirtById = (shirtId: number) => {
  return (dispatch: Dispatch<ShirtsActions>) => {
    try {
      let shirstLocalData: any = localStorage.getItem('availableShirts')
      shirstLocalData = JSON.parse(shirstLocalData)
      shirstLocalData = shirstLocalData.filter(
        (shirt: ShirtType) => shirt.id !== shirt.id,
      )
      localStorage.setItem('availableShirts', JSON.stringify(shirstLocalData))
      dispatch({
        type: ShirtsActionTypes.REMOVE_SHIRT_BY_ID,
        payload: shirtId,
      })
    } catch (error) {
      dispatch({
        type: ShirtsActionTypes.ADD_ERROR,
        payload: 'Cant remove this shirt id',
      })
    }
  }
}
