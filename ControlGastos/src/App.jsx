
import { useState } from 'react'
import { Header } from './components/header'
import { Modal } from './components/Modal'
import IconNewBudget from './img/nuevo-gasto.svg'

function App() {

  const [budget,setBudget] = useState(0)
  const [isValidBudget,setIsValidBudget] = useState(false)

  const [modal,setModal] = useState(false)

  const [animateModal,setAnimateModal] = useState(false)

  const [budgets,setBudgets] = useState([])

  const saveBudget = (budget)=>{
    setBudgets([...budgets], budget)
  }

  const handleNewBudget =() =>{
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
          <div className='nuevo-gasto'>
            <img src={IconNewBudget} alt='Nuevo gasto'
              onClick={handleNewBudget}
            />
          </div>
       )}
      {modal && <Modal animateModal={animateModal} setAnimateModal={setAnimateModal} saveBudget={saveBudget} setModal={setModal}/>}
    </div>
   
  )
}

export default App
