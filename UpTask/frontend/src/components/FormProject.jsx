import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import { Alert } from './Alert'

export const FormProject = () => {

    const [id, setid] = useState(null);
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [dDelivery,setDDelivery] = useState('')
    const [client,setClient] = useState('')

    const {showAlert,alert,submitProject,project} = useProjects()

    const params = useParams()

    useEffect(() => {
        if(params.id ){
            setid(project._id)
            setName(project.name)
            setDescription(project.description)
            setDDelivery(project.deliveryDate?.split('T')[0])
            setClient(project.client)
            return
        }

    }, [params]);

    const handleSubmit = async(e) =>{
        e.preventDefault()

        if([name,description,dDelivery,client].includes('')){
            showAlert({msg:'Todos los campos son obligatorios',error:true})
            return
        }

        await submitProject({id,name,description,dDelivery,client})

        setid(null)
        setName('')
        setDescription('')
        setDDelivery('')
        setClient('')
    }

    const {msg} = alert

  return (
    <form onSubmit={handleSubmit} className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>

        {msg && <Alert alert={alert}/>}

        <div className='mb-5'>
            <label htmlFor='name' className='text-gray-700 uppercase font-bold text-sm'>
                Nombre Proyecto
            </label>

            <input value={name} onChange={(e=>setName(e.target.value))} type='text' id='name' placeholder='Nombre del Proyecto' className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'/>
        </div>
        
        <div className='mb-5'>
            <label htmlFor='description' className='text-gray-700 uppercase font-bold text-sm'>
                Descripcion Proyecto
            </label>

            <textarea value={description} onChange={(e=>setDescription(e.target.value))} type='text' id='name' placeholder='Descripcion del Proyecto' className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'/>
        </div>

        <div className='mb-5'>
            <label htmlFor='date' className='text-gray-700 uppercase font-bold text-sm'>
                Fecha de Entrega
            </label>

            <input id='date' value={dDelivery} onChange={(e=>setDDelivery(e.target.value))} type='date' placeholder='Descripcion del Proyecto' className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'/>
        </div>

        <div className='mb-5'>
            <label htmlFor='client' className='text-gray-700 uppercase font-bold text-sm'>
                Nombre Cliente
            </label>

            <input value={client} onChange={(e=>setClient(e.target.value))} type='text' id='name' placeholder='Nombre del Cliente' className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'/>
        </div>

        <input type='submit' value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'} className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'/>
    </form>
  )
}
