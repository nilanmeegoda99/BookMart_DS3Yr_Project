import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import Alertmsg from '../components/Alert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Buffer from '../components/buffer'
import { getOrderInfo, OrderPayment } from '../actions/orderActions'
import { ORDER_PAYMENT_CLEAN } from '../constants/orderConstants'

const OrderView = ({ match }) => {
  const orderId = match.params.id
  const [sdkPayPal, setSDKpaypal] = useState(false)
  const dispatch = useDispatch()

  const orderinfo = useSelector((state) => state.orderinfo)
  const { order, loading, error } = orderinfo

  const orderPayment = useSelector((state) => state.orderPayment)
  const { loading: loadingpay, success: successpay } = orderPayment

  order.itemsCost = order.cartItems.reduce(
    (acc, item) => acc + item.price * item.oqty,
    0
  )

  useEffect(() => {
    //PAYPAL SCRIPT CONFIGURATION
    const payPal_dev_script = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSDKpaypal(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successpay) {
      if (!order || order._id !== orderId) {
        dispatch({ type: ORDER_PAYMENT_CLEAN })
        dispatch(getOrderInfo(orderId))
      }
    } else if (!order.isPaid) {
      if (!window.paypal) {
        payPal_dev_script()
      } else {
        setSDKpaypal(true)
      }
    }
  }, [dispatch, order, orderId, successpay])

  const successPaymenthandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(OrderPayment(orderId, paymentResult))
  }
  return loading ? (
    <Buffer />
  ) : error ? (
    <Alertmsg variant='danger'>{error}</Alertmsg>
  ) : (
    <>
      <h2>Order {order._id}</h2>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping to</h2>
              <strong>Name:</strong> {order.user.name}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              <p>
                <strong>Address: </strong>
                {order.shippingDetails.address}, {order.shippingDetails.city},{' '}
                {order.shippingDetails.postalCode},
                {order.shippingDetails.country},{' '}
                {order.shippingDetails.contactno}
              </p>
              {order.isDelivered ? (
                <Alertmsg variant='success'>
                  Delivered on {order.deliveredAt}
                </Alertmsg>
              ) : (
                <Alertmsg variant='danger'>Not Delivered</Alertmsg>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment type</h2>
              <p>
                <strong>Through: </strong>
                {order.paymentDetails}
              </p>
              {order.isPaid ? (
                <Alertmsg variant='success'>Paid on {order.paidAt}</Alertmsg>
              ) : (
                <Alertmsg variant='danger'>Not paid</Alertmsg>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Ordered Items</h2>
              {order.orderItems.length === 0 ? (
                <Alertmsg> Order is a null </Alertmsg>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, id) => (
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
                  <Col>${order.itemsCost}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Cost :</Col>
                  <Col>${order.shippingCost}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Cost : </Col>
                  <Col>${order.totalCost}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingpay && <Buffer />}
                  {!sdkPayPal ? (
                    <Buffer />
                  ) : (
                    <PayPalButton
                      amount={order.totalCost}
                      onSuccess={successPaymenthandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderView
