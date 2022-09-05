import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import '../css/chooseScreen.css'
import { RootState } from '../store'
import { PantsStateType } from '../state/reducers/PantsReducer'
import { choosePants } from '../state/action-creators/SetsActionCreators'
import { recommendPants } from '../state/action-creators/PantsActionCreators'
import ChooseComponent from '../components/ChooseComponent'
import { useDispatch } from 'react-redux'

const ChoosePantsScreen = () => {
  const pantsState: PantsStateType = useSelector(
    (state: RootState) => state.pants,
  )
  const actionCreators: ActionCreatorsMapObject<any> = {
    choosePants,
    recommendPants,
  }
  const dispatch = useDispatch()
  const relevantFunctions = bindActionCreators(actionCreators, dispatch)
  useEffect(() => {
    relevantFunctions.recommendPants()
  }, [])
  return (
    <div>
      <ChooseComponent
        availableProducts={pantsState.availablePants}
        chooseFunction={choosePants}
        recommendedProducts={pantsState.recommendedPants}
        type="pants"
        title="Choose pants"
        sizeOptions={[30, 31, 32, 34, 35, 36, 39, 42, 43, 48]}
        colorsOptions={['red', 'white', 'black', 'green', 'pink']}
        image={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjHFxDwtZMQ9F0JCVpll_UHj6RBqXkG0SJQ&usqp=CAU'
        }
      />
    </div>
  )
}

export default ChoosePantsScreen
