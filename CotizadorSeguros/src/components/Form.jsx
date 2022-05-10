import React,{Fragment, useContext} from 'react'
import { marcas,years,plans } from '../constants'
import useCotizador from '../hooks/useCotizador'
import { Error } from './error'

export const Form = () => {

   const {cotizarSeguro,data,handleChangeData,setError,error} = useCotizador()

   
   
    const handleSubmit = (e) =>{
        e.preventDefault()

        if(Object.values(data).includes('') ){
            return setError('Todos los campos obligatorios')
            
        }
        setError('')
        cotizarSeguro()
    }

    return (
    <>
        {error &&  <Error/>}
        <form
            onSubmit={handleSubmit}
        >
            <div className='my-5'>
                <label className='block mb-3 font-bold text-gray-400 uppercase'>
                    Marca
                </label>
                <select value={data.brand} onChange={e=> handleChangeData(e)} name='brand' className='w-full p-3 bg-white border border-gray-200'>
                    <option value="">-- Selecciona una marca --</option>
                    {marcas.map((marca)=>{
                        return <option  key={marca.id} value={marca.id}>{marca.name}</option>
                    })}
                </select>
            </div>

            <div className='my-5'>
                <label className='block mb-3 font-bold text-gray-400 uppercase'>
                    Año
                </label>
                <select value={data.year} name='year' onChange={e=> handleChangeData(e)} className='w-full p-3 bg-white border border-gray-200'>
                    <option value="">-- Selecciona un Año --</option>
                    {years.map((year)=>{
                        return <option  key={year} value={year}>{year}</option>
                    })}
                </select>
            </div>

            <div className='my-5'>
                <label className='block mb-3 font-bold text-gray-400 uppercase'>
                    Planes
                </label>
                <div className='flex gap-3 items-center'>
                    {plans.map((plan)=>{
                        return <Fragment key={plan.id}>
                            <label>{plan.name}</label>
                            <input onChange={e=> handleChangeData(e)} type='radio' name='plan' value={plan.id}/>
                        </Fragment>
                    })}
                </div>
            </div>

            <input className='w-full bg-indigo-500 hover:bg-indigo-700 transition-colors text-white cursor-pointer p-3 uppercase font-bold' 
                value='cotizar' type='submit'
            />
        </form>
    </>
  )
}
