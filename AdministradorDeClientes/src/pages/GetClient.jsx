import { useEffect, useState } from "react"
import { useParams } from "react-router-dom" 
import { Spinner } from "../components/Spinner"

export const GetClient = () => {

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
    loading ? <Spinner/> : (
        Object.keys(client).length === 0 ? <p>No hay resultados</p> : (

    <div>
        
        <>
        <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {client.name}</h1>
        <p className='mt-3'>Informacion del cliente</p>
        
        {client.name && (
            <p className="text-4xl mt-4 text-gray-600 ">
            <span className="text-gray-800 uppercase font-bold">
                Cliente: 
            </span> {client.name}
        </p>
        )}
        
        {client.email && (
            <p className="text-2xl mt-4 text-gray-600 ">
            <span className="text-gray-800 uppercase font-bold">
                Email: 
            </span> {client.email}
        </p>
        )}
        

        {client.numberPhone && (
            <p className="text-2xl mt-4 text-gray-600 " >
                <span className="text-gray-800 uppercase font-bold">
                    Telefono: 
                </span> {client.numberPhone}
            </p>
        )}
       

        {client.company && (
             <p className="text-2xl mt-4 text-gray-600 " >
             <span className="text-gray-800 uppercase font-bold">
                 Empresa: 
             </span> {client.company}
         </p>
        )}
       
        {client.notes && (
            <p className="text-2xl mt-4 text-gray-600 ">
            <span className="text-gray-800 uppercase font-bold">
                Notes: 
            </span> {client.notes}
        </p>
        )}
        </>
    )
    </div>
  )))
}
