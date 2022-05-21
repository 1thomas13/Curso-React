import Image from 'next/image'
import React, { useState } from 'react'
import { cashFormat } from '../helpers'
import { useQuiosco } from '../hooks/useQuiosco'

export const Product = ({product}) => {

    const {nombre,imagen,precio,} = product
    const {handleSetProduct,handleChangeModal} = useQuiosco()

  return (
    <div className='border p-3'>
        <Image width={400} height={500} src={`/assets/img/${imagen}.jpg`} alt={`img ${nombre}`} />

        <div className='p-5'>
            <h3 className='text-2xl font-bold'>{nombre}</h3>
            <p className='mt-5 font-black text-4xl text-amber-500'>
                {cashFormat(precio)}
            </p>
            <button   className='bg-indigo-600 hover:bg-indigo-800 w-full mt-5 p-3 font-bold text-white' type='button'
                onClick={() => {
                    handleChangeModal();
                    handleSetProduct(product);
                }}
            >
                Agregar
            </button>
        </div>
    </div>
  )
}
