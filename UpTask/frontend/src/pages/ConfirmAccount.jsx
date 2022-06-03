import {useParams,Link} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Alert } from '../components/Alert'
import axiosClient from '../config/axiosClient'

export const ConfirmAccount = () => {

  const params = useParams()
  const {id} = params

  const [alert,setAlert] = useState({})
  const [accountConfirm,setAccountConfirm] = useState(false)

  useEffect(() =>{
    const confirm = async () =>{
      try {
        const url = `/user/confirm/${id}`

        const {data} = await axiosClient(url)
      
        setAlert({msg:data.msg,error:false})
        setAccountConfirm(true)

      } catch (error) {
        setAlert({msg:error.response.data.msg,error:true})
      }
    }

    confirm()

  },[])

  const {msg} = alert

  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl'>
        Confirma Tu Cuenta Y Administra Tus {" "}
        <span className='text-slate-700'>
          Proyectos
        </span>
      </h1>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alert alert={alert}/>}

        {accountConfirm && (
          <Link className='block text-center my-5 text-slate-500 text-sm' to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  )
}
