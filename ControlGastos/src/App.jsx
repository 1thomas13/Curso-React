
import { useState } from 'react'
import { Header } from './components/header'
import { Modal } from './components/Modal'
import IconNewBill from './img/nuevo-gasto.svg'
import { generateId } from './helpers/generateId'
import {ListBudgets} from './components/ListBudgets'

function App() {

  const [budget,setBudget] = useState(0)
  const [isValidBudget,setIsValidBudget] = useState(false)

  const [modal,setModal] = useState(false)

  const [animateModal,setAnimateModal] = useState(false)

  const [bills,setBills] = useState([])

  const saveBill = bill =>{
 
    bill.id = generateId()
    console.log(bill)
    
    setBills([...bills], bill)
    console.log(bills)

    setAnimateModal(false)

    setTimeout(()=>{
        setModal(false)
    },400)

  }

  const handleNewBill =() =>{
    setModal(true)

    setTimeout(()=>{
      setAnimateModal(true)
    },300)
  }

  return (
    <div>
       <Header 
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
       />
       {isValidBudget && (
        <>
          <main>
            <ListBudgets bills={bills}/>
          </main>

          <div className='nuevo-gasto'>
            <img src={IconNewBill} alt='Nuevo gasto'
              onClick={handleNewBill}
            />
          </div>
        </>
       )}
      {modal && <Modal animateModal={animateModal} setAnimateModal={setAnimateModal} saveBill={saveBill} setModal={setModal}/>}
    </div>
   
  )
}

export default App
