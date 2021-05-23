
import {ORDER_ADDED_REQUEST, ORDER_ADDED_SUCCESS, ORDER_ADDED_FAIL,ORDER_INFO_REQUEST,ORDER_INFO_SUCCESS,ORDER_INFO_FAIL} from '../constants/orderConstants'

export const orderADDReducer = (state = {}, action) => {
    switch(action.type)
    {
        case ORDER_ADDED_REQUEST:
            return{
                loading: true
            }
        case ORDER_ADDED_SUCCESS:
            return{
                loading: false,
                success:true,
                order: action.payload
            }
        case ORDER_ADDED_FAIL:
            return{
                loading: false,
                error: action.payload,
            }
        default:
            return state

    }
}

export const orderInfoReducer = (state = {loading: true, orderItems: [], shippingAddress:{}}, action) => {
    switch(action.type)
    {
        case ORDER_INFO_REQUEST:
            return{
                ...state,
                loading: true
            }
        case ORDER_INFO_SUCCESS:
            return{
                loading: false,
                order: action.payload
            }
        case ORDER_INFO_FAIL:
            return{
                loading: false,
                error: action.payload,
            }
        default:
            return state

    }
}