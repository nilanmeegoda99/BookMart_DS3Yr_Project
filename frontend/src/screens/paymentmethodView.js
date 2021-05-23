import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import FormC from '../components/Form_layout'
import { useDispatch, useSelector } from 'react-redux'
import { recordPaymentmethod } from '../actions/cartActions'
import Checkoutnavigator from '../components/checkoutnavigator'

const PaymentmethodView = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingDetails } = cart

  if (!shippingDetails) {
    history.push('/shippingprocess')
  }

  const [paymentMethod, setPaymentmethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submithandler = (e) => {
    e.preventDefault()
    dispatch(recordPaymentmethod(paymentMethod))
    history.push('/confirmOrder')
  }

  return (
    <FormC>
      <Checkoutnavigator s1 s2 s3 />
      <h2> Choose a Payment Method</h2>

      <Form onSubmit={submithandler}>
        <Form.Group>
          <Form.Label >Available Methods</Form.Label>
        

       
        <Col>
            
            <Form.Check type='radio' label='PayPal' id='Paypal' checked onChange={(e) => setPaymentmethod(e.target.value)} name='paymentGateway' value='Paypal' ></Form.Check>
            <Form.Check type='radio' label='Stripe' id='Stripe'  onChange={(e) => setPaymentmethod(e.target.value)} name='paymentGateway' value='Stripe' ></Form.Check>
            <Form.Check type='radio' label='Mobile' id='Mobile'  onChange={(e) => setPaymentmethod(e.target.value)} name='paymentGateway' value='Mobile' ></Form.Check>

        </Col>

        </Form.Group>
       
        <Button type='submit' variant='primary'>
          Next
        </Button>
      </Form>
    </FormC>
  )
}

export default PaymentmethodView
