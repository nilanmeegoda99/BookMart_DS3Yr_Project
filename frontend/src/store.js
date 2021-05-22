import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productInfoReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userSignInReducer, userCreateReducer, userInfoReducer, userUpdateReducer } from './reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productInfo: productInfoReducer,
  cart: cartReducer,
  userSignin: userSignInReducer,
  userCreate: userCreateReducer,
  userInfo: userInfoReducer,
  userUpdateAcc: userUpdateReducer,
})

const cartAddeditemsfromLocalStrg = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

  const userInfoPassedfromLocalStrg = localStorage.getItem('userDetails')
  ? JSON.parse(localStorage.getItem('userDetails'))
  : null

const initialState = {
  cart: { cartItems: cartAddeditemsfromLocalStrg },
  userSignin: {userDetails: userInfoPassedfromLocalStrg},
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
