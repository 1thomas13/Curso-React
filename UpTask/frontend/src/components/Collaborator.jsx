import React, { useState } from 'react'
import useProjects from '../hooks/useProjects'

export const Collaborator = ({collaborator}) => {

    const {handleModalDeleteCollaborator} = useProjects()

  return (
    <div className='border-b p-5 flex justify-between items-center'>
        <div>
            <p>
                {collaborator.name}
            </p>
            <p className='text-sm text-gray-700'>
                {collaborator.email}
            </p>
        </div>
        <div>
            <button onClick={()=> handleModalDeleteCollaborator(collaborator)} type='button' className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'>
                Eleminar
            </button>
        </div>
    </div>
  )
}
