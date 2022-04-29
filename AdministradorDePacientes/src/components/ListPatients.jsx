import React from 'react'
import { Patients } from './Patients'



export const ListPatients = ({patients,setPatient,deletePatient}) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll ">
        <h2 className='font-black text-3xl text-center'>Listado de pacientes</h2>
        <p className='text-xl mt-5 mb-10 text-center'>
            Administra tus {" "}
            <span className='text-indigo-600 font-bold'>pacientes y haz seguimientos</span>
        </p>
        {patients && patients.length ? "" : <div className='font-bold text-2xl text-center mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-md'>No hay pacientes</div>}
        
        {patients.map((patient) => {
            return(<Patients key={patient.id} setPatient={setPatient} deletePatient={deletePatient} patient={patient}/>)
        })}

    </div>
    
  )
}
