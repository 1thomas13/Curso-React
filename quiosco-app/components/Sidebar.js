import React from 'react'
import Image from 'next/image'
import { useQuiosco } from '../hooks/useQuiosco'
import { Category } from './Category'

export const Sidebar = () => {

    const {categories} = useQuiosco()

  return (
    <>
        <Image width={300} height={100} src='/assets/img/logo.svg' alt='img logo' />

        <nav className='mt-10'>
            {categories.map((category)=>{
                return <Category key={category.id} category={category}/>
            })
            }
        </nav>
    </>
  )
}
