import { Form } from './components/Form'
import  Header  from './components/header'
import { ListPatients } from './components/ListPatients'
import { useEffect, useState } from 'react'

function App() {

  const localPatients = JSON.parse(localStorage.getItem('patients')) ?? []

  const [patients,setPatients] = useState(localPatients)
  const [patient,setPatient] = useState({})

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients))
  },[patients])

  const deletePatient = (id) => {
    const updatePatients = patients.filter(patient => patient.id !== id)
    setPatients(updatePatients)
  }

  return (
    <div>
      <Header/>
      <div className='mt-12 md:flex'>
        <Form
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
        <ListPatients
          patients={patients}
          setPatient={setPatient}
          deletePatient={deletePatient}
        />
      </div>
      
     
    </div>
  )
}

export default App
