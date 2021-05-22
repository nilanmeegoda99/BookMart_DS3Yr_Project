import {
  USER_SIGIN_REQUEST,
  USER_SIGIN_SUCCESS,
  USER_SIGIN_FAIL,
  USER_SIGNOUT,
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
