import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { Button, Badge } from 'react-bootstrap'
import '../css/home.css'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchSets,
  createNewSet,
} from '../state/action-creators/SetsActionCreators'
import {
  fetchAvailablePants,
  removeAvailablePantsById,
} from '../state/action-creators/PantsActionCreators'
import {
  fetchAvailableShirts,
  removeAvailableShirtById,
} from '../state/action-creators/ShirtsActionCreators'
import {
  fetchAvailableShoes,
  removeAvailableShoesById,
} from '../state/action-creators/ShoesActionCreators'
import { GrStatusGood } from 'react-icons/gr'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { GiClothes } from 'react-icons/gi'
import { GiArmoredPants, GiRunningShoe } from 'react-icons/gi'
import { FaTshirt } from 'react-icons/fa'
import ErrorMessage from '../components/ErrorMessage'
import { RootState } from '../store'
import { SetsStateType } from '../state/reducers/SetsReducer'
import { ShirtsStateType } from '../state/reducers/ShirtsReducer'
import { ShoesStateType } from '../state/reducers/ShoesReducer'
import { PantsStateType } from '../state/reducers/PantsReducer'
import { IoIosCreate } from 'react-icons/io'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const setsState: SetsStateType = useSelector((state: RootState) => state.sets)
  const shirtsState: ShirtsStateType = useSelector(
    (state: RootState) => state.shirts,
  )
  const shoesState: ShoesStateType = useSelector(
    (state: RootState) => state.shoes,
  )
  const pantsState: PantsStateType = useSelector(
    (state: RootState) => state.pants,
  )
  const actionCreators = {
    fetchSets,
    fetchAvailableShirts,
    fetchAvailableShoes,
    fetchAvailablePants,
    createNewSet,
    removeAvailablePantsById,
    removeAvailableShirtById,
    removeAvailableShoesById,
  }
  const relevantFunctions = bindActionCreators(actionCreators, dispatch)

  const [createSetErrMsg, setCreateSetErrMsg] = useState<null | string>(null)

  useEffect(() => {
    relevantFunctions.fetchSets()
    relevantFunctions.fetchAvailablePants()
    relevantFunctions.fetchAvailableShirts()
    relevantFunctions.fetchAvailableShoes()
  }, [])

  return (
    <div>
      <Title title="Home" />
      <div className="buttons">
        <Button variant="primary" onClick={() => navigate('/mySets')}>
          <span className="my-sets">
            My sets <GiClothes />
            <Badge bg="dark">
              {setsState.sets !== null && setsState.sets.length}
            </Badge>
          </span>
        </Button>
      </div>
      <div className="items-left">
        Shirts left in the locker: {shirtsState.availableShirts.length}{' '}
        <FaTshirt />
        <br></br>
        Pants left in the locker: {pantsState.availablePants.length}{' '}
        <GiArmoredPants />
        <br></br>
        Shoes left in the locker: {shoesState.availableShoes.length}{' '}
        <GiRunningShoe />
        <br></br>
      </div>
      <div className="buttons">
        <Button
          variant="info"
          className="each-button"
          onClick={() => navigate('/createSet/shirt')}
        >
          Start create new set <IoIosCreate />
        </Button>
        <ErrorMessage message={createSetErrMsg} />
        <br></br>
        <br></br>
        <Button
          variant="success"
          className="each-button"
          onClick={() => {
            if (
              setsState.chosenPants &&
              setsState.chosenShirt &&
              setsState.chosenShoes
            ) {
              relevantFunctions.removeAvailablePantsById(
                setsState.chosenPants.id,
              )
              relevantFunctions.removeAvailableShoesById(
                setsState.chosenShoes.id,
              )
              relevantFunctions.removeAvailableShirtById(
                setsState.chosenShirt.id,
              )
              relevantFunctions.createNewSet(
                setsState.chosenShirt,
                setsState.chosenPants,
                setsState.chosenShoes,
              )
              alert('You have successfully created new set!')
            } else {
              setCreateSetErrMsg(
                'You must choose pants & shirt & shoes before create new set.',
              )
            }
          }}
        >
          Create the set with the selected items <AiOutlinePlus />
        </Button>
      </div>
    </div>
  )
}

export default HomeScreen
