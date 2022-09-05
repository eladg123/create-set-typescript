import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  ActionCreator,
  ActionCreatorsMapObject,
  bindActionCreators,
} from 'redux'
import { PantsType } from '../state/reducers/PantsReducer'
import { ShirtType } from '../state/reducers/ShirtsReducer'
import { ShoesType } from '../state/reducers/ShoesReducer'
import '../css/chooseScreen.css'
import Title from './Title'
import { Button, Table } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

interface Props {
  availableProducts: []
  type: string
  chooseFunction: ActionCreator<any>
  title: string
  sizeOptions: string[] | number[]
  colorsOptions: string[]
  image: string
  recommendedProducts?: []
}

const ChooseComponent = ({
  availableProducts,
  type,
  chooseFunction,
  title,
  sizeOptions,
  colorsOptions,
  image,
  recommendedProducts,
}: Props) => {
  if (type === 'shirt') {
    const startCreateTime: any = new Date()
    localStorage.setItem('startCreateTime', startCreateTime)
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filteredProducts, setFilteredProducts] = useState<
    ShirtType[] | ShoesType[] | PantsType[]
  >(availableProducts)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string | number>('')
  const actionCreators: ActionCreatorsMapObject<any> = { chooseFunction }
  const relevantFunctions = bindActionCreators(actionCreators, dispatch)
  const noRecommendedMsg: string = 'There are no recommended products.'
  useEffect(() => {
    //check if there is no filter
    if (selectedColor == '' && selectedSize == '') {
      setFilteredProducts(availableProducts)
    } // check if there is a color filter
    else if (selectedColor !== '' && selectedSize == '') {
      setFilteredProducts(
        availableProducts.filter(
          (product: ShirtType | ShoesType | PantsType) => {
            return product.color === selectedColor
          },
        ),
      )
    } // check if there is a size filter
    else if (selectedSize !== '' && selectedColor == '') {
      setFilteredProducts(
        availableProducts.filter(
          (product: ShirtType | ShoesType | PantsType) => {
            return product.size === selectedSize
          },
        ),
      )
    } // check if there is a size filter
    else if (selectedSize !== '' && selectedColor !== '') {
      setFilteredProducts(
        availableProducts.filter(
          (product: ShirtType | ShoesType | PantsType) => {
            return (
              product.size === selectedSize && product.color === selectedColor
            )
          },
        ),
      )
    }
  }, [selectedColor, selectedSize])
  return (
    <div className="container">
      <Title title={title} />
      <Button
        variant="secondary"
        onClick={() => {
          if (type == 'shirt') {
            navigate('/')
          } else if (type === 'pants') {
            navigate('/createSet/shirt')
          } else if (type === 'shoes') {
            navigate('/createSet/pants')
          }
        }}
      >
        Back
      </Button>
      <div className="recommended-options">
        <h4>Recommended options:</h4>
        {type == 'shirt' && noRecommendedMsg}
        {type !== 'shirt' && (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <td>ID</td>
                <td>Color</td>
                <td>Size</td>
                <td>Brand</td>
                <td>Image</td>
                <td>Choose</td>
              </tr>
            </thead>
            <tbody>
              {recommendedProducts &&
                recommendedProducts.map((product: ShoesType | PantsType) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.color}</td>
                      <td>{product.size}</td>
                      <td>{product.brand}</td>
                      <td>
                        <img
                          style={{ width: '100px', height: '100px' }}
                          src={image}
                        />
                      </td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => {
                            relevantFunctions.chooseFunction(product)
                            if (type === 'pants') {
                              navigate('/createSet/shoes')
                            } else if (type === 'shoes') {
                              navigate('/')
                            }
                          }}
                        >
                          Choose
                        </Button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        )}
      </div>
      <div className="other-option">
        <h4>Other Options:</h4>
        <div className="select-area">
          <span>Filter by sizes:</span>
          <Form.Select
            size="sm"
            style={{ width: '250px' }}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectedSize(e.target.value)
            }}
          >
            <option value="">Select size</option>
            {sizeOptions.map((option: number | string, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              )
            })}
          </Form.Select>
          <span>Filter by colors:</span>
          <Form.Select
            size="sm"
            style={{ width: '250px' }}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectedColor(e.target.value)
            }}
          >
            <option value="">Select color</option>
            {colorsOptions.map((option: string, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              )
            })}
          </Form.Select>
        </div>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Color</th>
              <th>Size</th>
              <th>Brand</th>
              <th>Image</th>
              <th>Choose</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 &&
              filteredProducts.map(
                (product: ShirtType | PantsType | ShoesType) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.color}</td>
                      <td>{product.size}</td>
                      <td>{product.brand}</td>
                      <td>
                        <img
                          src={image}
                          style={{ width: '100px', height: '100px' }}
                        />
                      </td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => {
                            relevantFunctions.chooseFunction(product)
                            if (type == 'shirt') {
                              navigate('/createSet/pants')
                            } else if (type === 'pants') {
                              navigate('/createSet/shoes')
                            } else if (type === 'shoes') {
                              navigate('/')
                            }
                          }}
                        >
                          Choose
                        </Button>
                      </td>
                    </tr>
                  )
                },
              )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default ChooseComponent
