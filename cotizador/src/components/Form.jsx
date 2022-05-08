import React,{Fragment} from 'react'
import { marcas,years,plans } from '../constants'

export const Form = () => {
  return (
    <>
        <form>
            <div className='my-5'>
                <label className='block mb-3 font-bold text-gray-400 uppercase'>
                    Marca
                </label>
                <select name='brand' className='w-full p-3 bg-white border border-gray-200'>
                    <option value="">-- Selecciona una marca --</option>
                    {marcas.map((marca)=>{
                        return <option key={marca.id} value={marca.id}>{marca.name}</option>
                    })}
                </select>
            </div>

            <div className='my-5'>
                <label className='block mb-3 font-bold text-gray-400 uppercase'>
                    Año
                </label>
                <select name='brand' className='w-full p-3 bg-white border border-gray-200'>
                    <option value="">-- Selecciona un Año --</option>
                    {years.map((year)=>{
                        return <option key={year} value={year}>{year}</option>
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
                            <input type='radio' name='plan' value={plan.id}/>
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
