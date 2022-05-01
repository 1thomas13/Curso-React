
import { useState } from 'react'
import { Header } from './components/header'
import { Modal } from './components/Modal'
import IconNewBill from './img/nuevo-gasto.svg'
import { generateId } from './helpers/generateId'
import {ListBills} from './components/ListBills'

function App() {

  const [budget,setBudget] = useState(0)
  const [isValidBudget,setIsValidBudget] = useState(false)

  const [modal,setModal] = useState(false)

  const [animateModal,setAnimateModal] = useState(false)

  const [bills,setBills] = useState([])

  const saveBill = bill =>{
 
    bill.id = generateId()
    bill.date = Date.now()

    setBills([...bills, bill])

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
    <div className={modal ? 'fijar' : ''}>
       <Header 
        bills={bills}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
       />
       {isValidBudget && (
        <>
          <main>
            <ListBills bills={bills}/>
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
