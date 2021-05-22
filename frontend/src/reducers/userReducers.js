import {
  USER_SIGIN_REQUEST,
  USER_SIGIN_SUCCESS,
  USER_SIGIN_FAIL,
  USER_SIGNOUT,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL
} from '../constants/userConstants'

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGIN_REQUEST:
      return { loading: true }
    case USER_SIGIN_SUCCESS:
      return { loading: false, userDetails: action.payload }
    case USER_SIGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_SIGNOUT:
      return {}
    default:
      return state
  }
}

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true }
    case USER_CREATE_SUCCESS:
      return { loading: false, userDetails: action.payload }
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
