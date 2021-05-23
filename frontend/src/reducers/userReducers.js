import {
  USER_SIGIN_REQUEST,
  USER_SIGIN_SUCCESS,
  USER_SIGIN_FAIL,
  USER_SIGNOUT,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  USER_UPDATE_ACC_REQUEST,
  USER_UPDATE_ACC_SUCCESS,
  USER_UPDATE_ACC_FAIL,
  USER_UPDATE_ACC_CLEAN,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
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

export const userInfoReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { ...state, loading: true }
    case USER_INFO_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_INFO_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_UPDATE_ACC_REQUEST:
      return {loading: true }
    case USER_UPDATE_ACC_SUCCESS:
      return { loading: false, success: true, userDetails: action.payload }
    case USER_UPDATE_ACC_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_ACC_CLEAN:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = {users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
  
    default:
      return state
  }
}
