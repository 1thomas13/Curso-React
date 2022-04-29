import React from 'react'

export const Patients = ({patient,setPatient,deletePatient}) => {

    const handleDelete = () => {
        const resp = confirm('¿Estas seguro de eliminar este paciente?')

        if(resp){
            deletePatient(patient.id)
        }
    }

    return (
    <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-md'>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
                Nombre: 
                <span className='font-normal normal-case'> {patient.name}</span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
                Propietario: 
                <span className='font-normal normal-case'> {patient.client}</span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
                Email: 
                <span className='font-normal normal-case'> {patient.email}</span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
                Fecha alta: 
                <span className='font-normal normal-case'> {patient.date}</span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
                Sintomas: 
                <span className='font-normal normal-case'> {patient.symptoms}</span>
            </p>

            <div className='flex justify-between mt-10'>
                <button className='py-2 px-10 bg-indigo-600 text-white font-bold uppercase rounded-lg hover:bg-indigo-700' 
                    type='buttton'
                    onClick={() => setPatient(patient)}>
                    Editar
                </button>
                <button className='py-2 px-10 bg-red-600 text-white font-bold uppercase rounded-lg hover:bg-red-700'
                type='buttton'
                onClick={handleDelete}
                >
                    Eleminar
                </button>
            </div>
        </div>
  )
}
