import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormControl,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Buffer from '../components/buffer'
import Alertmsg from '../components/Alert'
import { listProductInfo } from '../actions/productActions'

const ProductView = ({ history, match }) => {
  const [stk_count, set_stkCount] = useState(1)

  const dispatch = useDispatch()

  const productInfo = useSelector((state) => state.productInfo)
  const { loading, error, product } = productInfo

  useEffect(() => {
    dispatch(listProductInfo(match.params.id))
  }, [dispatch, match])

  const cartHandler = () => {
    history.push(`/cart/${match.params.id}?stkqty=${stk_count}`)

  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Back
      </Link>

      {loading ? (
        <Buffer />
      ) : error ? (
        <Alertmsg variant='danger'>{error}</Alertmsg>
      ) : (
        <Row>
          <Col md={6}>
            <Image
              src={product.b_image}
              height='450'
              width='400'
              alt={product.b_name}
              fluid
            />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.b_name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={` ${product.numReviews} reviews `}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: LKR {product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.b_description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/*if products are available in the stock */}

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                    <Col>Quantity</Col>
                      <Col>
                      
                        <FormControl
                          as='select'
                          value={stk_count}
                          onChange={(e) => set_stkCount(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                   onClick={cartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add To cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductView
