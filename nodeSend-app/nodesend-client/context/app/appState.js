import { useReducer } from "react";
import appContext from './appContext'
import appReducer from './appReducer'
import { CREATE_LINK_SUCCESS,ADD_MAX_DOWNLOADS, ADD_PASSWORD,UPLOAD_FILE, RESET_STATE,CREATE_LINK_FAILED,SHOW_ALERT,RESET_ALERT,UPLOAD_FILE_FAILED,UPLOAD_FILE_SUCCESS } from "../../types";
import axiosClient from "../../config/axios";

const AppState = ({children}) => {

    const initialState = {
        msgFile: null,
        name:'',
        originName:'',
        loading: null,
        downloads:1,
        password:'',
        author:null,
        url: ''
    }

    const [state, dispatch] = useReducer(appReducer, initialState)

    const showAlert = (msg) =>{
        console.log(msg)
        dispatch({
            type:SHOW_ALERT,
            payload: msg
        })

        setTimeout(() => {
            dispatch({
                type:RESET_ALERT,
            })
        }, 4000);
    }

    const uploadFile = async(formData,  fileName) => {

        dispatch({
            type: UPLOAD_FILE,
        })

        try {
            const res = await axiosClient.post('/api/files', formData)
            console.log(res.data)

            dispatch({
                type:UPLOAD_FILE_SUCCESS,
                payload: {
                    name: res.data.file,
                    originName: fileName
                }
            })

        } catch (error) {
            console.log(error)

            dispatch({
                type:UPLOAD_FILE_FAILED,
                payload: error.response.data.msg
            })
        }
    }

    const createLink = async() => {
        const data = {
            name: state.name,
            originName: state.originName,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }

        try {
            const res = await axiosClient.post('/api/links', data)

            dispatch({
                type:CREATE_LINK_SUCCESS,
                payload: res.data.msg
            })

            console.log(res.data.msg)
        } catch (error) {
            dispatch({
                type:CREATE_LINK_SUCCESS,
                payload: res.data.msg
            })
        }
    }

    const resetState = () =>{
        dispatch({
            type:RESET_STATE,
        })
    }

    const addPassword = (password) => {
        
        dispatch({
            type:ADD_PASSWORD,
            payload:password
        })
    }

    const addMaxDownloads = (max) => {
        dispatch({
            type:ADD_MAX_DOWNLOADS,
            payload:max
        })
    }

    return(
        <appContext.Provider value={{
            msgFile: state.msgFile,showAlert,
            name: state.name, originName: state.originName,
            uploadFile, loading: state.loading,
            createLink ,  downloads: state.downloads,
            password: state.password,author: state.author,
            url: state.url, resetState,
            addPassword,addMaxDownloads
            }}>
            {children}
        </appContext.Provider>
    )
}

export default AppState