import { useState } from "react";
import useProjects from "../hooks/useProjects";
import { Alert } from "./Alert";

export const FormCollaborator = () => {

    const [email, setEmail] = useState('');

    const {showAlert,alert,submitCollaborator} = useProjects()

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        if(email=== ''){
            showAlert({msg:'El Email es Obligatorio',error:true})
            return
        }
        await submitCollaborator(email)
    }

    const {msg} = alert
    console.log(alert)
  return (
    <form onSubmit={handleSubmit} className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow">
        {msg && <Alert alert={alert}/>}
        <div className='mb-5'>
            <label htmlFor='email' className='text-gray-700 uppercase font-bold text-sm'>
                Email Colaborador
            </label>

            <input type='email' onChange={(e)=>setEmail(e.target.value)}  value={email} id='email' placeholder='Email del Usuario' className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'/>
        </div>

        <input type='submit' value='Buscar Colaborador' className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'/>
    </form>
  )
}
