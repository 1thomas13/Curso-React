import React, { useContext } from 'react'
import {Form} from './Form'
import useCotizador from '../hooks/useCotizador'
import {Spinner} from '../components/Spinner'
import {Result} from '../components/Result'

export const AppInsurance = () => {

  const {res,loading} = useCotizador()

  return (
    <>
        <header className='my-10'>
            <h1 className='text-white text-center text-4xl font-black'>
                Cotizador de Seguros de Auto
            </h1>
        </header>

        <main className='bg-white md:w-2/3 lg:w-2/4 mx-auto shadow rounded-lg p-10 mb-10'>
            <Form/>
            {loading ? <Spinner/> : <Result/>  }
           
        </main>
    </>
  )
}
