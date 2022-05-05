
import {useNavigate}from 'react-router-dom'

export const Client = ({client, handleDelete}) => {

    const {name,company,email,numberPhone,notes,id} = client

    const navigate = useNavigate()

  return (
    <tr className='border-b hover:bg-gray-50'>
        <td className='p-3'>{name}</td>
        <td className='p-3'>
            <p><span className='text-gray-800 uppercase font-bold'>Email: </span>email</p>
            <p><span className='text-gray-800 uppercase font-bold'>Tel: </span>{numberPhone}</p>
        </td>
        <td className='p-3'>{company}</td>
        <td className='p-3'>
            <button onClick={()=> navigate(`/clientes/${id}`)}  className='mt-3 bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs' type='button' >
                Ver
            </button>

            <button onClick={()=>{navigate(`/clientes/editar/${id}`)}} className='mt-3 bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs' type='button'>
                Editar
            </button>

            <button onClick={()=>handleDelete(id)} className='mt-3 bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs' type='button'>
                Eleminar
            </button>
        </td>
    </tr>
  
   
  )
}
