import axios from 'axios'
import {CART_ADD_BOOK} from '../constants/cartConstants'

export  const addToCart = (id, oqty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch ({
        type: CART_ADD_BOOK,
        payload: {
            product: data._id,
            name: data.b_name,
            image: data.b_image,
            price: data.price,
            countInStock: data.countInStock,
            oqty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}