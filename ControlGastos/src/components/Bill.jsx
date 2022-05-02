import React from 'react'
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

import { dateFormat } from '../helpers/generateId'

import IconSaving from '../img/icono_ahorro.svg'
import IconHouse from '../img/icono_casa.svg'
import IconFood from '../img/icono_comida.svg'
import IconLeisure from '../img/icono_ocio.svg'
import IconHealth from '../img/icono_salud.svg'
import IconSubscriptions from '../img/icono_suscripciones.svg'
import IconBills from '../img/icono_gastos.svg'

const dictionaryIcons = {
  ahorro: IconSaving,
  comida: IconFood,
  casa: IconHouse,
  ocio: IconLeisure,
  salud: IconHealth,
  suscripciones: IconSubscriptions,
  gastos: IconBills
}

export const Bill = ({ bill,setEditBill,deleteBill }) => {
  
  const leadingActions = ()=>{
    return (
    <LeadingActions>
      <SwipeAction onClick={()=>setEditBill(bill)}>
        Editar
      </SwipeAction>
    </LeadingActions>
    )
  }

  const trailingActions = ()=>{
    return (
      <TrailingActions>
        <SwipeAction onClick={()=>deleteBill(bill.id)} destructive={true}>
          Eleminar
        </SwipeAction>
      </TrailingActions>
      )
  }

  return (
    <SwipeableList>
      <SwipeableListItem 
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>

            <img
              src={dictionaryIcons[bill.category]}
              alt='icono Gasto'
            />

            <div className='descripcion-gasto'>
              <p className='categoria'>
                {bill.category}
              </p>
              <p className='nombre-gasto'>
                {bill.name}
              </p>
              <p className='fecha-gasto'>
                Agregado el:{""}
                <span>{dateFormat(bill.date)}</span>
              </p>
            </div>
          </div>
          <p className='cantidad-gasto'>
            ${bill.amount}
          </p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
