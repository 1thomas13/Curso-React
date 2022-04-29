import {useState,useEffect} from 'react'
import {Error} from "./Error"

export const Form = ({patients, setPatients,patient,setPatient}) => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [client,setClient] = useState('')
  const [date,setDate] = useState('')
  const [symptoms,setSymptoms] = useState('')

  const [error,setError] = useState(false)

  useEffect(()=>{
    if(Object.keys(patient).length > 0){
      setName(patient.name)
      setEmail(patient.email)
      setClient(patient.client)
      setDate(patient.date)
      setSymptoms(patient.symptoms)
    }
    
  },[patient])

  const generateId =()=>{
    return Math.random().toString(36).substr(2)+new Date().toString(36)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if([name,email,client,date,symptoms].includes("")){

      setError(true)
      return
    }
    
    setError(false)

    const patientObject = {
      name,
      email,
      client,
      date,
      symptoms,
    }

    if(patient.id){
      patientObject.id = patient.id

      const patientsUpdate = patients.map(patientState => {
        if(patientState.id === patientObject.id){
          return patientObject
        }
        return patient
      })

      setPatients(patientsUpdate)
      setPatient({})
    }
    else{
      patientObject.id = generateId()
      setPatients([...patients, patientObject])
    }

    setName('')
    setClient('')
    setDate('')
    setEmail('')
    setSymptoms('')

  }

  return (
    <div className="md:w-1/2 md:ml-5 lg:w-2/5">
      <h2 className='font-black text-xl text-center'> Formulario</h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Añade pacientes y {" "}
        <span className='text-indigo-600 font-bold '>Administralos</span>
      </p>
      <form onSubmit={handleSubmit} className='bg-white shadow-lg rounded-sm py-10 px-5 mb-10'>
        {error && <Error msj='Todos los campos son requeridos'/>}
        <label htmlFor='pet' className='block text-gray-700 uppercase font-bold'>
          Nombre Mascota
        </label>
        <input
          id='pet'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          type="text"
          placeholder="Nombre de la mascota" 
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />

        <label htmlFor='client' className='block text-gray-700 uppercase font-bold'>
          Nombre del propietario
        </label>
        <input
          id='client'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          type="text"
          placeholder="Nombre del propietario" 
          value={client}
          onChange={(e)=>setClient(e.target.value)}
          />

        <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>
          Email
        </label>
        <input
          id='email'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          type="email"
          placeholder="Email del propietario"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />

        <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>
          Alta
        </label>
        <input
          id='alta'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          type="date" 
          value={date}
          onChange={(e)=>setDate(e.target.value)}
          />

        <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>
          sintomas
        </label>
        <textarea id='symptoms' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          placeholder='Describe los sintomas' 
          value={symptoms}
          onChange={(e)=>setSymptoms(e.target.value)}
        />
       
        <input type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer"
          value={patient.id ? 'Editar paciente' : 'Agregar paciente'}

        />
         
      </form>
    </div>
  )
}


