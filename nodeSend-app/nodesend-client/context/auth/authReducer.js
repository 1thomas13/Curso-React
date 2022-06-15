import {USER_AUTHENTICATED,LOGOUT,LOGIN_FAILED,LOGIN_SUCCESS, REGISTER_SUCCESS,RESET_ALERT, REGISTER_FAILED} from '../../types'

export default (state, action) => {
    switch(action.type) {
        
        case LOGIN_FAILED:
        case REGISTER_SUCCESS:
        case REGISTER_FAILED:
            return {
                ...state,
                msg: action.payload
            }

        case RESET_ALERT:
            return {
                ...state,
                msg:null
            }

        case USER_AUTHENTICATED:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }

        case LOGIN_SUCCESS:

            localStorage.setItem('token', action.payload)

            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
        
        case LOGOUT:

            localStorage.removeItem('token')

            return {
                ...state,
                token:null,
                user:null,
                authenticated:null
            }

        default:
            return state
    }
}