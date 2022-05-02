import React, { useEffect, useState } from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const ControlBudget = ({budget,bills}) => {

    const [available,setAvailable] = useState(0)

    const [spent,setSpent] = useState(0)

    const [percentage,setPercentage] = useState(0)

    useEffect(()=>{
        const totalSpent = bills.reduce((total,bill)=>{
            return bill.amount + total
        },0)

        setSpent(totalSpent)

        const totalAvailable = budget - totalSpent
        setAvailable(totalAvailable)

        const newPercentage = ((budget-totalAvailable) / budget*100).toFixed(2)

        setTimeout(()=>{
            setPercentage(newPercentage)
        },1000)
      
    },[bills])


    const formatBudget = (amount) =>{
        return amount.toLocaleString('en-US',{
            style:'currency',
            currency:'USD'
        })
    }

    const handleResetApp =()=>{
        
        const result = confirm('¿Deseas reiniciar los presupuestos y gastos ingresados?')

        if(result){
            localStorage.clear()
            window.location.reload()
        }
        
    }
  

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar value={percentage} 
                styles={buildStyles({pathColor: percentage>100 ? '#dc2626' : '#ebb2f6',trailColor:'#f5f5f5', textColor:percentage>100 ? '#dc2626' : '#ebb2f6'})}
                text={`${percentage}% Gastado`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto : {formatBudget(budget)}</span>
            </p>
            <p className={`${available}` < 0 ? 'negativo' : ''}>
                <span>Disponible : {formatBudget(available)}</span>
            </p> 
            <p>
                <span>Gastado : {formatBudget(spent)}</span>
            </p>
        </div>
    </div>
  )
}
