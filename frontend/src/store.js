import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productInfoReducer,
  productDeleteReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userSignInReducer, userCreateReducer, userInfoReducer, userUpdateReducer, userListReducer } from './reducers/userReducers'
import {orderADDReducer, orderInfoReducer, orderPaymentReducer} from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productInfo: productInfoReducer,
  cart: cartReducer,
  userSignin: userSignInReducer,
  userCreate: userCreateReducer,
  userInfo: userInfoReducer,
  userUpdateAcc: userUpdateReducer,
  orderAdd: orderADDReducer,
  orderinfo: orderInfoReducer,
  orderPayment:orderPaymentReducer,
  userListb: userListReducer,
  productDelete: productDeleteReducer,
})

const cartAddeditemsfromLocalStrg = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

  const userInfoPassedfromLocalStrg = localStorage.getItem('userDetails')
  ? JSON.parse(localStorage.getItem('userDetails'))
  : null

  const shippingAdressfromLocalStrg = localStorage.getItem('shippingDetails')
  ? JSON.parse(localStorage.getItem('shippingDetails'))
  : {}

const initialState = {
  cart: { cartItems: cartAddeditemsfromLocalStrg, shippingDetails: shippingAdressfromLocalStrg },
  userSignin: {userDetails: userInfoPassedfromLocalStrg},

}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
