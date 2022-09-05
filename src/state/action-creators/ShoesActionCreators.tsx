import { publicAPI } from '../../api/Server'
import { ShoesActions } from '../actions/ShoesIndex'
import { ShoesActionTypes } from '../constants-types/ShoesIndex'
import { ShoesType } from '../reducers/ShoesReducer'
import { Dispatch } from 'redux'
import { AxiosResponse } from 'axios'
import { Pants, Shirt, Shoes } from '../interfaces'
import { recommendShoesUtils } from '../../utils/RecommendItems'

export const fetchAvailableShoes = () => {
  return async (dispatch: Dispatch<ShoesActions>) => {
    try {
      let shoesLocalData: any = localStorage.getItem('availableShoes')
      shoesLocalData = JSON.parse(shoesLocalData)
      if (shoesLocalData) {
        dispatch({
          type: ShoesActionTypes.FETCH_AVAILABLE_SHOES,
          payload: shoesLocalData,
        })
      } else {
        const response: AxiosResponse = await publicAPI.get('/')
        if (response.data) {
          localStorage.setItem(
            'availableShoes',
            JSON.stringify(
              response.data.filter(
                (product: ShoesType) => product.type === 'shoes',
              ),
            ),
          )
        }
      }
    } catch (error) {
      dispatch({
        type: ShoesActionTypes.ADD_ERROR,
        payload: 'Shoes not available',
      })
    }
  }
}

export const clearErrorMessage = () => {
  return (dispatch: Dispatch<ShoesActions>) => {
    dispatch({ type: ShoesActionTypes.CLEAR_ERROR })
  }
}

export const removeAvailableShoesById = (shoesId: number) => {
  return (dispatch: Dispatch<ShoesActions>) => {
    try {
      let shoesLocalData: any = localStorage.getItem('availableShoes')
      shoesLocalData = JSON.parse(shoesLocalData)
      shoesLocalData = shoesLocalData.filter(
        (shoes: ShoesType) => shoes.id !== shoes.id,
      )
      localStorage.setItem('availableShoes', JSON.stringify(shoesLocalData))
      dispatch({
        type: ShoesActionTypes.REMOVE_SHOES_BY_ID,
        payload: shoesId,
      })
    } catch (error) {
      dispatch({
        type: ShoesActionTypes.ADD_ERROR,
        payload: 'Cant remove this shoes id',
      })
    }
  }
}

export const recommendShoes = () => {
  return (dispatch: Dispatch<ShoesActions>) => {
    try {
      let chosenShirtSTRING = localStorage.getItem('chosenShirt')
      let availableShoesSTRING = localStorage.getItem('availableShoes')
      if (chosenShirtSTRING && availableShoesSTRING) {
        let chosenShirt: Shirt = JSON.parse(chosenShirtSTRING)
        let availableShoes: Shoes[] = JSON.parse(availableShoesSTRING)
        const response = recommendShoesUtils(
          { color: chosenShirt.color, size: chosenShirt.size },
          availableShoes,
        )
        dispatch({
          type: ShoesActionTypes.FETCH_RECOMMENDED_SHOES,
          payload: response,
        })
      }
    } catch (error) {
      dispatch({
        type: ShoesActionTypes.ADD_ERROR,
        payload: 'No items to recommend',
      })
    }
  }
}
