import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormC from '../components/Form_layout'
import { useDispatch, useSelector } from 'react-redux'
import {recordShippinginfo} from '../actions/cartActions'
import Checkoutnavigator from '../components/checkoutnavigator'

const ShippingprocessView = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingDetails } = cart

  const [address, setAddress] = useState(shippingDetails.address)
  const [city, setCity] = useState(shippingDetails.city)
  const [postalCode, setPostalcode] = useState(shippingDetails.postalCode)
  const [contactno, setContactNo] = useState(shippingDetails.contactno)
  const [country, setCountry] = useState(shippingDetails.country)


  const dispatch = useDispatch()

  const submithandler = (e) => {
    e.preventDefault()
    dispatch(recordShippinginfo({address, city, postalCode, contactno, country}))
    history.push('/paymentprocess')
  }

  return (
    <FormC>
      <Checkoutnavigator s1 s2 />
      <h2> Shipping Page</h2>
      
      <Form onSubmit={submithandler}>
        <Form.Group controlId='address'>
          <Form.Label>Residential Adress</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your postalCode'
            value={postalCode}
            required
            onChange={(e) => setPostalcode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='contactno'>
          <Form.Label>Contact No</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your contact number'
            value={contactno}
            required
            onChange={(e) => setContactNo(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          {' '}
          Next{' '}
        </Button>
      </Form>
    </FormC>
  )
}

export default ShippingprocessView
