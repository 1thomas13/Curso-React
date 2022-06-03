import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export const Sidebar = () => {

  const {auth} = useAuth()

  return (
    <aside className='md:w-1/# lg:w-1/5 xl:w-1/6 py-10 px-5'>
      <p className='text-xl font-bold'>Hola {auth.name}</p>
      <Link to="crear-proyecto" className='bg-sky-600 w-full font-bold uppercase block mt-5 text-center text-white rounded-lg p-3'>
        Nuevo Proyecto
      </Link>
    </aside>
  )
}
