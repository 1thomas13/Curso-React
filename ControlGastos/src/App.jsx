
import { useEffect, useState } from 'react'
import { Header } from './components/header'
import { Modal } from './components/Modal'
import IconNewBill from './img/nuevo-gasto.svg'
import { generateId } from './helpers/generateId'
import {ListBills} from './components/ListBills'
import {Filters} from './components/Filters'

function App() {

  const [budget,setBudget] = useState(Number(localStorage.getItem('budget')) ?? 0)
  const [isValidBudget,setIsValidBudget] = useState(false)

  const [modal,setModal] = useState(false)

  const [animateModal,setAnimateModal] = useState(false)

  const [bills,setBills] = useState(
    localStorage.getItem('bills') ? JSON.parse(localStorage.getItem('bills')) : []
  )

  const [editBill,setEditBill] = useState({})

  const [filter,setFilter] = useState('')
  const [filteredBills,setFilteredBills] = useState([])


  useEffect(()=>{
    localStorage.setItem('budget',budget ?? 0)
  },[budget])

  useEffect(()=>{
    const budgetLS = Number(localStorage.getItem('budget') ?? 0)

    if(budgetLS > 0){
      setIsValidBudget(true)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('bills',JSON.stringify(bills) ?? [])
  },[bills])

  useEffect(()=>{
    if(filter){
      const filteredBills = bills.filter(bill =>
        bill.category === filter
      )

      setFilteredBills(filteredBills)
    }
  },[filter])

  const saveBill = bill =>{
 
    if(bill.id){
      const updateBills = bills.map(billState =>{
        return billState.id === bill.id ? bill : billState
      })

      setBills(updateBills)

    }else{
      bill.id = generateId()
      bill.date = Date.now()

      setBills([...bills, bill])
    }
    
    setAnimateModal(false)

    setTimeout(()=>{
        setModal(false)
    },400)

  }

  const deleteBill = id =>{
    const updateBills = bills.filter(bill =>
      bill.id !== id
    )

    setBills(updateBills)
  }

  useEffect(()=>{
    if(Object.keys(editBill).length > 0){
      setModal(true)
  
      setTimeout(()=>{
        setAnimateModal(true)
      },300)
    }
  },[editBill])

  const handleNewBill =() =>{
    setModal(true)
    setEditBill({})

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
        setBills={setBills}
        
       />
       {isValidBudget && (
        <>
          <main>
            <Filters filter={filter} setFilter={setFilter}></Filters>
            <ListBills filter={filter} filteredBills={filteredBills} deleteBill={deleteBill} setEditBill={setEditBill} bills={bills}/>
          </main>

          <div className='nuevo-gasto'>
            <img src={IconNewBill} alt='Nuevo gasto'
              onClick={handleNewBill}
            />
          </div>
        </>
       )}
      {modal && <Modal setEditBill={setEditBill} editBill={editBill} animateModal={animateModal} setAnimateModal={setAnimateModal} saveBill={saveBill} setModal={setModal}/>}
    </div>
   
  )
}

export default App
