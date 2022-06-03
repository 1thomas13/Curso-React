import React from 'react'
import { Link } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import useAuth from '../hooks/useAuth'
import { Search } from './Search'


export const Header = () => {


    const {handleSearch,closeSessionProjects} = useProjects()

    const {closeSessionAuth} = useAuth()

    const closeSession = () => {
        closeSessionProjects()
        closeSessionAuth()
        localStorage.removeItem('token')
    }

  return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className='md:flex md:justify-between'>
            <h2 className='text-4xl mb-5 md:mb-0 text-sky-600 font-black text-center'>
                UpTask
            </h2>

            <div className='flex flex-col md:flex-row items-center gap-4'>
                <button onClick={handleSearch } type='button' className='font-bold uppercase'>Buscar Proyecto</button>
                <Link to="/proyectos" className='font-bold uppercase' >Proyectos</Link>
                <button onClick={closeSession} type='button' className='text-white text-sm rounded-md uppercase font-bold bg-sky-600 p-3'>
                    Cerrar Sesión
                </button>
            </div>

           <Search/>
        </div>
    </header>
  )
}
