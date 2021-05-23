import {ORDER_ADDED_REQUEST, ORDER_ADDED_SUCCESS, ORDER_ADDED_FAIL,ORDER_INFO_REQUEST,ORDER_INFO_SUCCESS,ORDER_INFO_FAIL, ORDER_PAYMENT_SUCCESS, ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_FAIL} from '../constants/orderConstants'
import axios from 'axios'



export const AddOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_ADDED_REQUEST,
      })
  
      const {
        userSignin: { userDetails },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userDetails.token}`,
        },
      }
  
      const { data } = await axios.post(`/api/orders`, order, config)
  
      dispatch({
        type: ORDER_ADDED_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: ORDER_ADDED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  export const getOrderInfo = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_INFO_REQUEST,
      })
  
      const {
        userSignin: { userDetails },
      } = getState()
  
      const config = {
        headers: {
          
          Authorization: `Bearer ${userDetails.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/orders/${id}`,config)
  
      dispatch({
        type: ORDER_INFO_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: ORDER_INFO_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const OrderPayment = (orderID, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAYMENT_REQUEST,
      })
  
      const {
        userSignin: { userDetails },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userDetails.token}`,
        },
      }
  
      const { data } = await axios.put(`/api/orders/${orderID}/pay`,paymentResult,config)
  
      dispatch({
        type: ORDER_PAYMENT_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: ORDER_PAYMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }