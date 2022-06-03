import { useState } from 'react'
import {Link} from 'react-router-dom'
import { Alert } from '../components/Alert'
import axios from 'axios'
import axiosClient from '../config/axiosClient'

export const ForgetPassword = () => {

  const [email,setEmail] = useState('')
  const [alert,setAlert] = useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(email === '' || email.length < 6){
      setAlert({msg:'El email es Obligatorio', error:true})
      return
    }

    try {
      const {data} = await axiosClient.post(`/user/forgetpassword`,{
        email
      })

      setAlert({msg:data.msg, error:false})

   
    } catch (error) {
      setAlert({msg:error.response.data.msg, error:true})
    }

    
  }

  const {msg} = alert

  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl'>
        Recupera tu Acceso Y No Pierdas Tus {" "}
        <span className='text-slate-700'>
          Proyectos
        </span>
      </h1>

      {msg && <Alert alert={alert}/>}

      <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg p-10'>

        <div className='my-5'>
          <label htmlFor='email' className='uppercase text-gray-600 block text-xl font-bold'>
            Email
          </label>
          <input id='email' onChange={(e)=> setEmail(e.target.value)} value={email} type='email' placeholder='Ingrese su Email' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>

        <input type='submit' value='Enviar Instrucciones' className='mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors bg-sky-700 w-full py-3 text-white rounded uppercase'/>

      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link className='block text-center my-5 text-slate-500 text-sm' to="/">
          Iniciar Sesión
        </Link>
        <Link className='block text-center my-5 text-slate-500 text-sm' to="/registrar">
          No Tengo Cuenta
        </Link>
      </nav>

    </>
  )
}
