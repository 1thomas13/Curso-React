import React from 'react'

import { Bill } from './Bill'

export const ListBills = ({ bills }) => {

  return (
    <div className='listado-gastos contenedor'>
      <h2>
        {bills.length ? 'Gastos' : 'No tiene ningun gasto'}
      </h2>

      {bills.map((bill) =>

        <Bill
          key={bill.id}
          bill={bill}
        />
      )}

    </div>
  )
}
