import React from 'react'
import Item from './Item'
import { CardGroup } from 'react-bootstrap'
import { Button, Card } from 'react-bootstrap'
import '../css/mySets.css'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteSetById } from '../state/action-creators/SetsActionCreators'
import { SetType } from '../state/reducers/SetsReducer'
import { AiFillDelete } from 'react-icons/ai'

interface Props {
  set: SetType
  index: number
}

const Set = ({ set, index }: Props) => {
  const dispatch = useDispatch()
  const actionCreators = { deleteSetById }
  const relevantFunctions = bindActionCreators(actionCreators, dispatch)
  return (
    <div className="set">
      <CardGroup>
        <Item
          type="shirt"
          item={set.shirt}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSafxk5WzcB0UQboAJQ_VkG8YLmYzI1VEYe5w&usqp=CAU"
        />
        <Item
          type="pants"
          item={set.pants}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjHFxDwtZMQ9F0JCVpll_UHj6RBqXkG0SJQ&usqp=CAU"
        />
        <Item
          type="shoes"
          item={set.shoes}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQlxXcwfD7MSXaVIhVUUI4uWX2Q8jM39mCgQ&usqp=CAU"
        />
        <Card.Text className="font">
          Created at: {set.createdAt} <br></br> Created in: {set.timeToCreate}{' '}
          minutes
        </Card.Text>
        <Card.Text className="del-container">
          <Button
            className="del-btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this set?')) {
                relevantFunctions.deleteSetById(set.id)
              } else {
                console.log('Set not deleted')
              }
            }}
            variant="danger"
          >
            Delete set <AiFillDelete />
          </Button>
        </Card.Text>
      </CardGroup>
    </div>
  )
}

export default Set
