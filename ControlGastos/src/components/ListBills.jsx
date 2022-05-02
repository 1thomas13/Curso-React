import React from 'react'

import { Bill } from './Bill'

export const ListBills = ({ bills,setEditBill,deleteBill,filter,filteredBills }) => {

  return (
    <div className='listado-gastos contenedor'>
      {
        filter ? (
          <>
            <h2>
              {filteredBills.length ? 'Gastos' : 'No tiene ningun gasto'}
            </h2>
            {filteredBills.map((bill) =>
              <Bill
                deleteBill={deleteBill}
                setEditBill={setEditBill}
                key={bill.id}
                bill={bill}
            />)}
          </>
        ) : <>
        <h2>
          {bills.length ? 'Gastos' : 'No tiene ningun gasto'}
        </h2>
        {bills.map((bill) =>
          <Bill
            deleteBill={deleteBill}
            setEditBill={setEditBill}
            key={bill.id}
            bill={bill}
          />)
        }
         </>
      }

     

    </div>
  )
}
