import axios from 'axios'
import {USER_SIGIN_FAIL, USER_SIGIN_REQUEST, USER_SIGIN_SUCCESS, USER_SIGNOUT, USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAIL} from '../constants/userConstants'

export const Sign_In = (email, password) => async(dispatch) =>{

    try{
        dispatch({
            type: USER_SIGIN_REQUEST,
        })

        const config = {
            headers: {
                    'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/login', {email, password}, config)

        dispatch({
            type: USER_SIGIN_SUCCESS,
            payload: data
        })
        
        localStorage.setItem('userDetails', JSON.stringify(data))

    } catch(error)
    {
        dispatch({
            type: USER_SIGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }


} 


export const signout = () => dispatch => {
    localStorage.removeItem('userDetails')
    dispatch({type: USER_SIGNOUT})
}


export const AddUser = (name,email, password) => async(dispatch) =>{

    try{
        dispatch({
            type: USER_CREATE_REQUEST,
        })

        const config = {
            headers: {
                    'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users', {name, email, password}, config)

        dispatch({
            type: USER_CREATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type:USER_SIGIN_SUCCESS,
            payload:data,
        })
        
        localStorage.setItem('userDetails', JSON.stringify(data))

    } catch(error)
    {
        dispatch({
            type: USER_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }


} 