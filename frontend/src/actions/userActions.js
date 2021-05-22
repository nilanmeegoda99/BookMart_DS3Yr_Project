import axios from 'axios'
import {USER_SIGIN_FAIL, USER_SIGIN_REQUEST, USER_SIGIN_SUCCESS} from '../constants/userConstants'

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