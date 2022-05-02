import React, { useState } from 'react'

import iconCloseModal from '../img/cerrar.svg'
import { Msj } from './Msj'

export const Modal = ({setModal,animateModal,setAnimateModal,saveBill,editBill,setEditBill}) => {

    const [name,setName] = useState('')
    const [amount,setAmount] = useState(0)
    const [category, setCategory] = useState("")

    const [msj,setMsj] = useState("")
    const [id,setId] = useState('')

    const [date,setDate] = useState()

    const handleSubmit = e =>{
        e.preventDefault()

        if([name,amount,category].includes('')){
            setMsj("Todos los campos son requeridos")

            setTimeout(()=>{
                setMsj()
            },2500)
            return
        }

        saveBill({name,amount,category,id,date})

    }

    const closeModal = ()=>{
        
        setAnimateModal(false)
        setEditBill({})
        setTimeout(()=>{
            setModal(false)
        },400)
    }
  
   useState(()=>{
       if(Object.keys(editBill).length > 0){
           setName(editBill.name)
           setAmount(editBill.amount)
           setCategory(editBill.category)
           setId(editBill.id)
           setDate(editBill.date)
       }
   },[])

  return (
    <div className='modal'>
        <div className=' cerrar-modal'>
            <img src={iconCloseModal} alt="Cerrar Modal"
                onClick={closeModal}
            />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${animateModal ? "animar" : '' }`}>
            <legend>{editBill.name ? 'Editar Gasto' : 'Nuevo gasto'}</legend>

            {msj && <Msj type='error'>{msj}</Msj>}

            <div className='campo'>
                <label htmlFor='name'>Nombre del Gasto</label>
                <input id='name' type="text" value={name} onChange={(e => setName(e.target.value))} placeholder="Añade el nombre del gasto"/>
            </div>
            

            <div className='campo'>
                <label htmlFor='amount'>Cantidad</label>
                <input id='amount' value={amount} onChange={(e => setAmount(Number(e.target.value)))} type="text" placeholder="Añade la cantidad del gasto"/>
            </div>

            <div className='campo'>
                <label htmlFor='category'> Categoria</label>
                <select id='category' value={category} onChange={(e => setCategory(e.target.value))}>
                    <option value="">Seleccione</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscriptciones</option>
                    <option value="gastos">Gastos Varios</option>
                </select>
            </div>
            <input
                type="submit"
                value={editBill.name ? 'Guardar Cambios' : 'Nuevo gasto'}
            />
        </form>
    </div>
  )
}
