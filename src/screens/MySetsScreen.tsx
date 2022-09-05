import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { SetsStateType, SetType } from '../state/reducers/SetsReducer'
import { RootState } from '../store'
import { fetchSets } from '../state/action-creators/SetsActionCreators'
import Title from '../components/Title'
import Set from '../components/Set'
import { Button } from 'react-bootstrap'
import ErrorMessage from '../components/ErrorMessage'
import '../css/mySets.css'

const MySetsScreen = () => {
  const distpach = useDispatch()
  const navigate = useNavigate()
  const setsState: SetsStateType = useSelector((state: RootState) => state.sets)
  const actionCreators: ActionCreatorsMapObject<any> = { fetchSets }
  const relevantFunctions = bindActionCreators(actionCreators, distpach)

  useEffect(() => {
    relevantFunctions.fetchSets()
  }, [])

  return (
    <div className="screen">
      <Title title="My sets" />
      <Button
        className="font"
        variant="secondary"
        onClick={() => navigate('/')}
      >
        Back
      </Button>
      {setsState.sets.length > 0 ? (
        setsState.sets.map((set: SetType, index) => {
          return (
            <>
              <Set key={index} set={set} index={index + 1} />
            </>
          )
        })
      ) : (
        <>
          <br></br>
          <br></br>
          <br></br>
          <ErrorMessage message="You do not create sets yet!" />
        </>
      )}
    </div>
  )
}

export default MySetsScreen
