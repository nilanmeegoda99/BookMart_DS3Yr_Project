import React, { useEffect } from 'react'

import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Alertmsg from '../components/Alert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Checkoutnavigator from '../components/checkoutnavigator'
import { AddOrder } from '../actions/orderActions'

const ConfirmOrder = ({history}) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const orderAdd = useSelector(state => state.orderAdd)
  const {order, success, error} = orderAdd
  useEffect(() => {
    if(success){
      history.push(`/orders/${order._id}`)
    }
    // eslint-disable-next-line 
  },[history, success])

  const confirmOrderHandler = () => {
    dispatch(
      AddOrder({
        orderItems: cart.cartItems,

        shippingAddress: cart.shippingDetails,
     
       paymentMethod: cart.paymentDetails,
        itemsPrice: cart.itemsCost,
        shippingPrice: cart.shippingCost,
        totalPrice: cart.totalCost,
      })
    )
  }

  console.log(cart.cartItems);

  cart.itemsCost = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.oqty,
    0
  )
  cart.shippingCost = cart.itemsCost > 1500 ? 0 : 150
  cart.totalCost = Number(cart.itemsCost + cart.shippingCost)

  return (
    <>
      <Checkoutnavigator s1 s2 s3 s4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping to</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingDetails.address}, {cart.shippingDetails.city},{' '}
                {cart.shippingDetails.postalCode},{cart.shippingDetails.country}
                , {cart.shippingDetails.contactno}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment type</h2>
              <p>
                <strong>Through: </strong>
                {cart.paymentDetails}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Ordered Items</h2>
              {cart.cartItems.length === 0 ? (
                <Alertmsg> Cart is a empty one </Alertmsg>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, id) => (
                    <ListGroup.Item key={id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width='30'
                            height='40'
                            fliud
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.oqty} X LKR {item.price} = LKR{' '}
                          {item.oqty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>OrderCost :</Col>
                  <Col>${cart.itemsCost}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Cost :</Col>
                  <Col>${cart.shippingCost}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Cost : </Col>
                  <Col>${cart.totalCost}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Alertmsg variant='danger'>{error}</Alertmsg>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  disabled={cart.cartItems === 0}
                  onClick={confirmOrderHandler}
                >
                  Confirm Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ConfirmOrder
