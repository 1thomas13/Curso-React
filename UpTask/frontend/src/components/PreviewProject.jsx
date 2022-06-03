import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export const PreviewProject = ({project}) => {

  const {auth} = useAuth()

  const {_id,name,client,creator} = project

  return (
    <div className='border-b p-5 flex justify-between flex-col md:flex-row'>
      <div className='flex items-center gap-2'>
        <p className='flex-1'>
            {name}
          <span className='text-sm text-gray-500 uppercase'>
              {''} {client}
          </span>
        </p>
        {auth._id !== creator && (<p className='p-1 text-xs rounded-lg bg-green-500 font-bold uppercase text-white'>Colaborador</p>)}
      </div>
        
        <Link to={`${_id}`} className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'>Ver Proyecto</Link>
    </div>
  )
}
