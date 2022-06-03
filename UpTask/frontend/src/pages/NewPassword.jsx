import {Link,useParams} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Alert } from '../components/Alert'
import axiosClient from '../config/axiosClient'

export const NewPassword = () => {

  const [password,setPassword] = useState('')
  const [alert,setAlert] = useState({})
  const [validToken, setValidToken] = useState(false)

  const params = useParams()

  useEffect(()=>{
    const validateToken = async () => {

      try {
        await axiosClient(`/user/forgetpassword/${params.token}`)

        setValidToken(true)

      } catch (error) {
        setAlert({msg:error.response.data.msg,error:true})
      }
    }

    validateToken()
  },[])

  const {msg} = alert

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(password< 6 ){
      setAlert({msg:'La contraseña debe ser superior a 6 caracteres',error:true})
      return
    }

    try {
      const {data} =  await axiosClient.post(`/user/forgetpassword/${params.token}`,{
        password
      })
    
      setAlert({msg:data.msg,error:msg})

    } catch (error) {
      setAlert({msg:error.response.data.msg,error:true})
    }

  }

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl'>
        Reestablece Tu Contraseña Y No pierdas Acceso a Tus {" "}
        <span className='text-slate-700'>
          Proyectos
        </span>
      </h1>
      {msg && <Alert alert={alert}/>}
      {validToken && (
        <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg p-10'>

        <div className='my-5'>
          <label htmlFor='password' className='uppercase text-gray-600 block text-xl font-bold'>
            Nueva Contraseña
          </label>
          <input value={password} onChange={e => setPassword(e.target.value)} id='password' type='password' placeholder='Ingrese Una contraseña' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>

        <input type='submit' value='Guardar Contraseña' className='mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors bg-sky-700 w-full py-3 text-white rounded uppercase'/>

      </form>
      )}

      <nav className='lg:flex lg:justify-between'>
        <Link className='block text-center my-5 text-slate-500 text-sm' to="/">
          Iniciar Sesión
        </Link>
      </nav>

    </>
  )
}
