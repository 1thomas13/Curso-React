import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl'>
        Inicia Sesión Y Administra Tus {" "}
        <span className='text-slate-700'>
          Proyectos
        </span>
      </h1>

      <form className='my-10 bg-white shadow rounded-lg p-10'>
        <div className='my-5'>
          <label htmlFor='email' className='uppercase text-gray-600 block text-xl font-bold'>
            Email
          </label>
          <input id='email' type='email' placeholder='Ingrese su Email' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>
        <div className='my-5'>
          <label htmlFor='password' className='uppercase text-gray-600 block text-xl font-bold'>
            Password
          </label>
          <input id='password' type='password' placeholder='Ingrese Una contraseña' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>

        <input type='submit' value='Iniciar Sesion' className='mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors bg-sky-700 w-full py-3 text-white rounded uppercase'/>

      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link className='block text-center my-5 text-slate-500 text-sm' to="registrar">
          No Tengo Cuenta
        </Link>
        <Link className='block text-center my-5 text-slate-500 text-sm' to="olvide-mi-contraseña">
          Olvide Mi Contraseña
        </Link>
      </nav>

    </>
  )
}

export default Login