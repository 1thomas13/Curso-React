import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Alert } from '../components/Alert'
import axiosClient from '../config/axiosClient'
import useAuth from '../hooks/useAuth'

const Login = () => {

  const {setAuth} = useAuth()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [alert,setAlert] = useState({})

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    if([email,password].includes('')){
      setAlert({
        msg: 'Todos los Campos son Obligatorios',
        error:true
      })
      return
    }

    try {
      const {data} = await axiosClient.post('/user/login',{
        email,
        password
      })
      setAlert({})
      
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/proyectos')
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error:true
      })
    }
  }

  const {msg} = alert

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl'>
        Inicia Sesión Y Administra Tus {" "}
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
          <input value={email} onChange={e=> setEmail(e.target.value)} id='email' type='email' placeholder='Ingrese su Email' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>
        <div className='my-5'>
          <label htmlFor='password' className='uppercase text-gray-600 block text-xl font-bold'>
            Contraseña
          </label>
          <input value={password} onChange={e=> setPassword(e.target.value)} id='password' type='password' placeholder='Ingrese Una contraseña' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>

        <input type='submit' value='Iniciar Sesion' className='mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors bg-sky-700 w-full py-3 text-white rounded uppercase'/>

      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link className='block text-center my-5 text-slate-500 text-sm' to="registrar">
          No Tengo Cuenta
        </Link>
        <Link className='block text-center my-5 text-slate-500 text-sm' to="olvide-mi-password">
          Olvide Mi Contraseña
        </Link>
      </nav>

    </>
  )
}

export default Login