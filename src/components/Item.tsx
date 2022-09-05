import React from 'react'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'
import '../css/item.css'
import { ShoesType } from '../state/reducers/ShoesReducer'
import { PantsType } from '../state/reducers/PantsReducer'
import { ShirtType } from '../state/reducers/ShirtsReducer'

interface Props {
  item: ShirtType | PantsType | ShoesType
  type: string
  withPicture?: boolean
  image: string
}

const Item = ({ item, type, withPicture, image }: Props) => {
  return (
    <>
      {item && (
        <Card style={{ width: '13rem', display: 'flex' }}>
          {withPicture && (
            <Card.Img className="card-image" variant="top" src={image} />
          )}
          <Card.Title className="font">ID: {item.id}</Card.Title>
          <Card.Subtitle className="font">{type}</Card.Subtitle>
          <Card.Text className="font">
            Color: {item.color} <br></br>
            Size: {item.size} <br></br>
            Brand: {item.brand}
          </Card.Text>
          {withPicture && (
            <Button className="font" variant="success">
              Choose
            </Button>
          )}
        </Card>
      )}
    </>
  )
}

export default Item
