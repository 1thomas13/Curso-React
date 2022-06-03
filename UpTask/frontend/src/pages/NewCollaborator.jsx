import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { FormCollaborator } from '../components/FormCollaborator'
import useProjects from '../hooks/useProjects';

export const NewCollaborator = () => {

  const {getProject,project,loading,collaborator,addCollaborator,alert} = useProjects()

  const params = useParams()

  useEffect(() => {
    getProject(params.id)
  }, []);

  if(loading) return 'Cargando...'

  if(!project?._id) return <Alert alert={alert}/>

  return (
    <>
    <h1 className='text-4xl font-black'>
        Añadir Colaborador al Proyecto: {project.name}
    </h1>
    <div className='mt-10 flex justify-center'>
        <FormCollaborator/>
    </div>

    {loading ? <p className='text-center'>Cargando...</p> : collaborator?._id && (
      <div className='flex justify-center mt-10'>
        <div className='bg-white py-10 px-5  rounded-lg shadow w-full'>
          <h2 className='text-center mb-10 text-2xl font-bold'>
            Resultado:
          </h2>
          <div className='flex justify-between items-center'>
            <p>{collaborator.name}</p>
            <button onClick={() => addCollaborator({email:collaborator.email})} type='button' className='bg-slate-500 p-2 rounded-lg uppercase text-white font-bold text-sm'>
              Agregar Al Proyecto
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
