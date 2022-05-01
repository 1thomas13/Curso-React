import React from 'react'

import { NewBudget } from './NewBudget'
import { ControlBudget } from './ControlBudget'


export const Header = ({budget,setBudget,isValidBudget,setIsValidBudget,bills}) => {
  return (
    <header>
        <h1>Planificador de gastos</h1>

        {isValidBudget ? <ControlBudget bills={bills} budget={budget}/>  : (
             <NewBudget
             budget={budget}
             setBudget={setBudget}
             setIsValidBudget={setIsValidBudget}
         />
        )
            
        }
       
    </header>
  )
}
