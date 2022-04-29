import { Form } from './components/Form'
import  Header  from './components/header'
import { ListPatients } from './components/ListPatients'
import { useState } from 'react'

function App() {

  const [patients,setPatients] = useState([])
  const [patient,setPatient] = useState({})

  return (
    <div>
      <Header/>
      <div className='mt-12 md:flex'>
        <Form
          patients={patients}
          setPatients={setPatients}
          patient={patient}
        />
        <ListPatients
          patients={patients}
          setPatient={setPatient}
        />
      </div>
      
     
    </div>
  )
}

export default App
