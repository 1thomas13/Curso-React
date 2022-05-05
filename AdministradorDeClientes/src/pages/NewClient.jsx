import React from 'react'
import { FormComponent } from '../components/FormComponent'

export const NewClient = () => {
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo cliente</h1>
      <p className='mt-3'>Llena los siguientes campos para registrar un cliente</p>

      <FormComponent/>
    </>
  )
}
