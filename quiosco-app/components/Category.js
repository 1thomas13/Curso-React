import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuiosco } from '../hooks/useQuiosco'

export const Category = ({category}) => {

    const {nombre,icono,id} = category
    const {handleClickCategory, currentCategory} = useQuiosco()
    
  return (
    <div className={`${currentCategory?.id === id ? 'bg-amber-400' : ''} flex items-center gap-2 w-full border p-5 hover:bg-amber-400`}>
        <Image alt='img icon' width={70} height={70} src={`/assets/img/icono_${icono}.svg`} />

        <button onClick={()=> handleClickCategory(id)} type='button' className='text-2xl font-bold hover:cursor-pointer'>
            {nombre}
        </button>
    </div>
  )
}
