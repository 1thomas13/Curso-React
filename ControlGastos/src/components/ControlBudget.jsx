import React, { useEffect, useState } from 'react'

export const ControlBudget = ({budget,bills}) => {

    const [available,setAvailable] = useState(0)

    const [spent,setSpent] = useState(0)

    useEffect(()=>{
        const totalSpent = bills.reduce((total,bill)=>{
            return bill.amount + total
        },0)

        setSpent(totalSpent)

        const totalAvailable = budget - spent
        setAvailable(totalAvailable)

    },[bills])


    const formatBudget = (amount) =>{
        return amount.toLocaleString('en-US',{
            style:'currency',
            currency:'USD'
        })
    }
  

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <p>Grafica</p>
        </div>
        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto : {formatBudget(budget)}</span>
            </p>
            <p>
                <span>Disponible : {formatBudget(available)}</span>
            </p> 
            <p>
                <span>Gastado : {formatBudget(spent)}</span>
            </p>
        </div>
    </div>
  )
}
