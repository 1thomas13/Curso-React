import { useState } from 'react'
import {Link} from 'react-router-dom'
import { Alert } from '../components/Alert'
import axios from 'axios'
import axiosClient from '../config/axiosClient'

export const Register = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [repeatPassword,setRepeatPassword] = useState('')
  const [alert,setAlert] = useState({})

  const handleSubmit = async(e) => {
    e.preventDefault()

    if([name,email,password,repeatPassword].includes('')){
      setAlert({msg:'Todos Los Campos Son Obligatorios', error:true})
      return
    }

    if(password !== repeatPassword){
      setAlert({msg:'Las Contraseñas Deben Coincidir', error:true})
      return
    }

    if(password.length < 6){
      setAlert({msg:'La contraseña Debe Superar 6 Caracteres', error:true})
      return
    }

    setAlert({})

    try {
      const {data} = await axiosClient.post(`/user`,{
        name,email,password
      })

      setAlert({msg: data.msg, error:false})

      setName('')
      setEmail('')
      setPassword('')
      setRepeatPassword('')

    } catch (error) {
      setAlert({msg:error.response.data.msg,error:true})
    }
  }

  const {msg} = alert

  

  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl'>
        Crea Tu Cuenta Y Administra Tus {" "}
        <span className='text-slate-700'>
          Proyectos
        </span>
      </h1>

      {msg && <Alert alert={alert}/>}

      <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg p-10'>
        <div className='my-5'>
          <label htmlFor='name' className='uppercase text-gray-600 block text-xl font-bold'>
           Nombre
          </label>
          <input value={name} onChange={ e=> setName(e.target.value)} id='name' type='text' placeholder='Ingrese su Nombre' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>

        <div className='my-5'>
          <label htmlFor='email' className='uppercase text-gray-600 block text-xl font-bold'>
            Email
          </label>
          <input value={email} onChange={ e=> setEmail(e.target.value)} id='email' type='email' placeholder='Ingrese su Email' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>

        <div className='my-5'>
          <label htmlFor='password' className='uppercase text-gray-600 block text-xl font-bold'>
            Contraseña
          </label>
          <input value={password} onChange={ e=> setPassword(e.target.value)} id='password' type='password' placeholder='Ingrese Una contraseña' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>

        <div className='my-5'>
          <label htmlFor='repeatPassword' className='uppercase text-gray-600 block text-xl font-bold'>
            Repite la Contraseña
          </label>
          <input value={repeatPassword} onChange={ e=> setRepeatPassword(e.target.value)} id='repeatPassword' type='password' placeholder='Repite Tu Contraseña' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>

        <input type='submit' value='Crear Cuenta' className='mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors bg-sky-700 w-full py-3 text-white rounded uppercase'/>

      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link className='block text-center my-5 text-slate-500 text-sm' to="/">
          Iniciar Sesión
        </Link>
        <Link className='block text-center my-5 text-slate-500 text-sm' to="/olvide-mi-password">
          Olvide Mi Contraseña
        </Link>
      </nav>

    </>
  )
}
