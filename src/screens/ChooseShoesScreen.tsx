import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import '../css/chooseScreen.css'
import { RootState } from '../store'
import { ShoesStateType } from '../state/reducers/ShoesReducer'
import { chooseShoes } from '../state/action-creators/SetsActionCreators'
import { recommendShoes } from '../state/action-creators/ShoesActionCreators'
import ChooseComponent from '../components/ChooseComponent'
import { useDispatch } from 'react-redux'

const ChooseShoesScreen = () => {
  const shoesState: ShoesStateType = useSelector(
    (state: RootState) => state.shoes,
  )
  const actionCreators: ActionCreatorsMapObject<any> = {
    chooseShoes,
    recommendShoes,
  }
  const dispatch = useDispatch()
  const relevantFunctions = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    relevantFunctions.recommendShoes()
  }, [])
  return (
    <div>
      <ChooseComponent
        availableProducts={shoesState.availableShoes}
        chooseFunction={chooseShoes}
        recommendedProducts={shoesState.recommendedShoes}
        type="shoes"
        title="Choose shoes"
        sizeOptions={[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]}
        colorsOptions={['red', 'green', 'white', 'black', 'pink']}
        image={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQlxXcwfD7MSXaVIhVUUI4uWX2Q8jM39mCgQ&usqp=CAU'
        }
      />
    </div>
  )
}

export default ChooseShoesScreen
