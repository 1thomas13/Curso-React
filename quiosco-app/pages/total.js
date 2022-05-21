import React, { useCallback, useEffect } from 'react'
import { useQuiosco } from '../hooks/useQuiosco'
import { Layout } from '../layout/Layout'

export default function Total  () {

  const {order,name,setName,getOrder,total} = useQuiosco()

  const validateForm = useCallback(() =>{
    return order.length === 0 || name==='' || name.length <3
  },[order,name])

  useEffect(()=>{
    validateForm()
  },[order,validateForm])

  return (
    <Layout page={'total'}>
        <h1 className='text-4xl font-black'>
          Total y Confirmar Pedido
        </h1>
        <p className='text-2xl my-10'>Confirma tu Pedido a Continuación</p>

        <form onSubmit={getOrder}>
          <div>
            <label htmlFor='name' className='block uppercase text-slate-800 font-bold text-xl'>
              Nombre
            </label>

            <input value={name} onChange={e => setName(e.target.value)} type='text' id='name' className='bg-gray-200 w-full lg:w-1/3 p-2 rounded-md' />
          </div>

          <div className='mt-10'>
            <p className='text-2xl'>
              Total a Pagar: {''} 
              <span className='font-bold'>
                ${total}
              </span>
              </p>
          </div>

          <div className='mt-5'>
            <input disabled={validateForm()} value='Confirmar Pedido' type='submit' className={`${validateForm() ? 'bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer'} text-center w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white`}/>
          </div>
        </form>
    </Layout>
  )
}

