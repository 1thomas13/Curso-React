import React from 'react'
import { useState } from 'react'
import { Msj } from './Msj'


export const NewBudget = ({budget,setBudget,setIsValidBudget}) => {

    const [msj,setMsj] = useState("")

 

    const handleBudget = (e)=>{
        e.preventDefault()

        if(!budget ||budget<= 0 ){
           return setMsj("No es un presupuesto valido")
        }
        
        setMsj('')
        setIsValidBudget(true)
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handleBudget} className='formulario'>
            <div className='campo'>
                <label>Definir Presupuesto</label>
                <input
                    className='nuevo-presupuesto'
                    type="number"
                    placeholder='Agrega tu presupuesto'
                    value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                />  
            </div>
            <input type="submit" value="Añadir"/>
            {msj && <Msj type="error">{msj}</Msj>}
        </form>
    </div>
  )
}
