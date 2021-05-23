import {
  CART_ADD_BOOK,
  CART_REMOVE_BOOK,
  CART_RECORD_SHIPPING_ADDRESS,
  CART_RECORD_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingDetails: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_BOOK:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case CART_REMOVE_BOOK:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }

    case CART_RECORD_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingDetails: action.payload,
      }

    case CART_RECORD_PAYMENT_METHOD:
       return {
          ...state,
          paymentDetails: action.payload,
        }
    

    default:
      return state
  }
}
