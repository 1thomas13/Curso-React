import Image from 'next/image'
import React from 'react'
import { cashFormat } from '../helpers'
import { useQuiosco } from '../hooks/useQuiosco'

export const SummaryProduct = ({product}) => {

    const {handleEditAmount,handleDeleteProduct} = useQuiosco()


  return (
    <div className='shadow p-5 mb-3 flex gap-10 items-center'>
        <div className='md:w-1/6'>
            <Image width={300} height={400} alt={`Imagen producto ${product.name}`} src={`/assets/img/${product.imagen}.jpg`} />
        </div>
        <div className='md:w-4/6'>
            <p className='text-3xl font-bold'>
                {product.nombre}
            </p>
            <p className='text-xl mt-2 font-bold'>
                Cantidad: {product.amount}
            </p>
            <p className='text-xl mt-2 text-amber-500 font-bold'>
                Precio: {cashFormat(product.precio)}
            </p>

            <p className='text-sm text-gray-700 mt-2 '>
                Subtotal: {cashFormat(product.precio*product.amount)}
            </p>
        </div>

        <div>
            <button onClick={() => handleEditAmount(product.id)} type='button' className='bg-sky-700 text-white flex px-5 py-2 text-center rounded-md shadow-md w-full uppercase font-bold'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>

            <button onClick={() => handleDeleteProduct(product.id)}  type='button' className='bg-red-700 text-white flex px-5 mt-3 py-2 rounded-md shadow-md w-full uppercase font-bold'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
        
    </div>
  )
}
