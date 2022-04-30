import React from 'react'

export const ControlBudget = ({budget}) => {

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
                <span>Presupuesto : ${formatBudget(budget)}</span>
            </p>
            <p>
                <span>Disponible : ${formatBudget(0)}</span>
            </p> 
            <p>
                <span>Gastado : ${formatBudget(0)}</span>
            </p>
        </div>
    </div>
  )
}
