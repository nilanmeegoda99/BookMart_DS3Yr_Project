import axios from 'axios'
import { CART_ADD_BOOK, CART_REMOVE_BOOK, CART_RECORD_SHIPPING_ADDRESS, CART_RECORD_PAYMENT_METHOD } from '../constants/cartConstants'

export const addToCart = (id, oqty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_BOOK,
    payload: {
      product: data._id,
      name: data.b_name,
      image: data.b_image,
      price: data.price,
      countInStock: data.countInStock,
      oqty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) =>  (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_BOOK,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const recordShippinginfo = (data) =>  (dispatch) => {
  dispatch({
    type: CART_RECORD_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingDetails', JSON.stringify(data))
}

export const recordPaymentmethod = (data) =>  (dispatch) => {
  dispatch({
    type: CART_RECORD_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentDetails', JSON.stringify(data))
}

