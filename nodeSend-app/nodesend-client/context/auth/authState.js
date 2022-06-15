import AuthContext from './authContext.js'
import { useReducer } from 'react'
import authReducer from './authReducer.js'
import {USER_AUTHENTICATED,LOGOUT, REGISTER_SUCCESS,LOGIN_FAILED,LOGIN_SUCCESS,RESET_ALERT, REGISTER_FAILED} from '../../types'
import axiosClient from '../../config/axios.js'
import tokenAuth from '../../config/token.auth.js'

const AuthState = ({children}) => {

    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        authenticated: null,
        user: null,
        msg: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const newUser = async(data) => {
        try {
            const res = await axiosClient.post('/api/users', data)
            console.log(res.data.msg)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.msg
            })
        } catch (error) {
            dispatch({
                type: REGISTER_FAILED,
                payload: error.response.data.msg
            })
            console.log(error.response.data.msg)
        }

        setTimeout(() => {
            dispatch({
                type: RESET_ALERT,
            })
        }, 3000);
    }

    const loginUser = async(data) => {
        try {
            const res = await axiosClient.post('/api/auth', data)
            
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.token
            })

        } catch (error) {
            dispatch({
                type: LOGIN_FAILED,
                payload: error.response.data.msg
            })
        }

        setTimeout(() => {
            dispatch({
                type: RESET_ALERT,
            })
        }, 3000);
    }

    const userAuthenticated= async() => {
        const token = localStorage.getItem('token')
        if(token) {
            tokenAuth(token)
        }
        
        try {
            const res = await axiosClient.get('/api/auth')
            if(res.data.user){
                dispatch({
                    type:USER_AUTHENTICATED,
                    payload: res.data.user
                })
            }
            
        } catch (error) {
            console.log(error)
            dispatch({
                type: LOGIN_FAILED,
                payload: error.response.data.msg
            })
        }
    }

    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    return (
        <AuthContext.Provider value={{
            token: state.token, authenticated: state.authenticated,
            user: state.user, msg: state.msg,
            userAuthenticated, newUser,
            loginUser,logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState