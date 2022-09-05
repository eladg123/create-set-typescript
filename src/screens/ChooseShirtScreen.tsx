import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import '../css/chooseScreen.css'
import { RootState } from '../store'
import { ShirtsStateType } from '../state/reducers/ShirtsReducer'
import { chooseShirt } from '../state/action-creators/SetsActionCreators'
import ChooseComponent from '../components/ChooseComponent'

const ChooseShirtScreen = () => {
  const shirtsState: ShirtsStateType = useSelector(
    (state: RootState) => state.shirts,
  )
  return (
    <div>
      <ChooseComponent
        availableProducts={shirtsState.availableShirts}
        chooseFunction={chooseShirt}
        type="shirt"
        title="Choose shirt"
        sizeOptions={['S', 'M', 'L', 'XL', 'XXL']}
        colorsOptions={['red', 'white', 'black', 'green', 'pink']}
        image={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSafxk5WzcB0UQboAJQ_VkG8YLmYzI1VEYe5w&usqp=CAU'
        }
      />
    </div>
  )
}

export default ChooseShirtScreen
