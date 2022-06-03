import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FormProject } from '../components/FormProject';
import useProjects from '../hooks/useProjects'

export const EditProject = () => {

    const {getProject,project,loading,deleteProject} = useProjects()

    useEffect(() => {
        getProject(params.id)
    }, []);

    const params = useParams()

    if(loading) return 'Cargando...'

    const handleClick = async() => {
        if(confirm('¿Deseas Eleminar Este Proyecto?')){
            await deleteProject(params.id)
            return
        }
    }

  return (
    <>
        <div className="flex justify-between">
            <h1 className="font-black text-4xl">
                Editar Proyecto: {project.name}
            </h1>
            <div className="flex items-center gap-2 text-gray-400 hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <button onClick={handleClick} className='uppercase font-bold'>Eleminar</button>
            </div>
        </div>

        <div className='mt-10 flex justify-center'>
            <FormProject/>
        </div>
    </>
    
  )
}
