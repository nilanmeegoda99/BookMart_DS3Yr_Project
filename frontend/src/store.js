import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productInfoReducer } from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'


const reducer = combineReducers({
  productList: productListReducer,
  productInfo: productInfoReducer,
  cart: cartReducer
})

const cartAddeditemsfromLocalStrg = localStorage.getItem('cartItems') ? JSON.parse
(localStorage.getItem('cartItems')) : []

const initialState = {

  cart: {cartItems: cartAddeditemsfromLocalStrg}

}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
