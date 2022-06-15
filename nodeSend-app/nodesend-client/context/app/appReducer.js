import { CREATE_LINK_SUCCESS,ADD_MAX_DOWNLOADS,ADD_PASSWORD,RESET_STATE,UPLOAD_FILE,CREATE_LINK_FAILED,SHOW_ALERT,RESET_ALERT,UPLOAD_FILE_FAILED,UPLOAD_FILE_SUCCESS } from "../../types";

export default (state,action) =>{
    switch(action.type) {

        case RESET_ALERT:
            return {
                ...state,
                msgFile: null
            }

        case SHOW_ALERT:
            return {
                ...state,
                msgFile: action.payload
            }

        case UPLOAD_FILE: 
            return {
                ...state,
                loading:true
            }

        case UPLOAD_FILE_SUCCESS: 
            return {
                ...state,
                name: action.payload.name,
                originName: action.payload.originName,
                loading:null
            } 

        case UPLOAD_FILE_FAILED:
            return{
                ...state,
                msgFile:action.payload,
                loading:null
            }

        case CREATE_LINK_SUCCESS:
            return {
                ...state,
                url:action.payload
            }

        case RESET_STATE:
            return {
                ...state,
                msgFile: null,
                name:'',
                originName:'',
                loading: null,
                downloads:1,
                password:'',
                author:null,
                url: ''
            }
        
        case ADD_PASSWORD:
            return {
                ...state,
                password: action.payload
            }

        case ADD_MAX_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload
            }
            
        default:
            return state
    }
}