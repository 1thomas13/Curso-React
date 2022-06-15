import React, { useContext } from 'react'
import AuthContext from '../context/auth/authContext.js'
import appContext from "../context/app/appContext";

export const Alert = () => {

    const authContext = useContext(AuthContext)

    const {msg} = authContext

    const AppContext = useContext(appContext)
    const {msgFile} = AppContext

  return (
    <div className='bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center mx-auto text-white'>
        {msg || msgFile}
    </div>
  )
}
