
import {FormComponent} from '../components/FormComponent'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Alert } from '../components/Alert'


export const EditClient = () => {

  const [client, setClient] = useState({})
  const [loading, setLoading] = useState(true)

  const {id} = useParams()

  useEffect(()=>{

    const getClient = async()=>{
      try {
        
        const url = `http://localhost:4000/clientes/${id}`

        const response = await fetch(url)

        const responseJson = await response.json()

         setClient(responseJson)

      } catch (error) {
          console.log(error)
      }
      setTimeout(()=>{
        setLoading(!loading)
      },500)
  }

    getClient()
  },[])


  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>
      {client?.name ? (
         <FormComponent loading={loading} client={client}/>)
      : <Alert>El id del cliente no es valido</Alert>
    }
     
    </>
  )
}
