import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { cashFormat } from '../helpers'
import { useQuiosco } from '../hooks/useQuiosco'

export const ModalProduct = () => {

    const {product,handleChangeModal,handleAddOrder,order} = useQuiosco()

    const [amount,setAmount] = useState(1)
    const [edit,setEdit] = useState(false)

    useEffect(()=>{
        if(order.some(orderState => orderState.id === product.id)){

            const productEdit = order.find(orderState => orderState.id === product.id)

            setEdit(true)
            setAmount(productEdit.amount)
        } 
    },[product,order])

  return (
    <div className='md:flex gap-10 '>
        <div className='md:w-1/3'>
            <Image src={`/assets/img/${product.imagen}.jpg`} width={300} height={400} alt={`img ${product.nombre}`} />
        </div>

        <div className='md:w-2/3'>

            <div className='flex justify-end'>
                <button onClick={handleChangeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <h1 className='text-3xl font-bold mt-5'>
                {product.nombre}
            </h1>
            <p className='mt-5 font-black text-5xl text-amber-500'>
                {cashFormat(product.precio)}
            </p>

            <div className='flex gap-4 mt-5'>
                <button type='button' onClick={() => {if(amount <=1) return 
                    setAmount(amount-1)}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                <p className='text-3xl'>{amount}</p>

                <button type='button' onClick={() => setAmount(amount+1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            
            <button onClick={()=> handleAddOrder({...product,amount})} className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase'>
                {edit ? 'Guardar Cambios ': 'Añadir al Pedido'}
            </button>


        </div>
    </div>
  )
}
