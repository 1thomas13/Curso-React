import {useCallback, useMemo,useRef} from 'react'
import useCotizador from '../hooks/useCotizador'
import {marcas,plans} from '../constants'


export const Result = () => {
    const {res,data} = useCotizador()
    const {brand,plan,year} = data

    const yearRef = useRef(year)

    if(res === 0 ) return null

    const [nameBrand] = useCallback( 
        marcas.filter(value=>{
            return value.id === Number(brand)
    }),[Result])

    const [namePlan] =  useCallback( plans.filter(value=>{
        return value.id === Number(plan)
    }),[Result])

  return (
    
    <div className='bg-gray-100 text-center mt-5 p-5 shadow'>
        <h2 className='text-gray-600 font-black text-3xl'>
            Resumen
        </h2>
        <p>
            <span className='font-bold'>Marca: </span>
            {nameBrand.name}
        </p>

        <p>
            <span className='font-bold'>Plan: </span>
            {namePlan.name}
        </p>

        <p>
            <span className='font-bold'>Año del auto: </span>
            {yearRef.current}
        </p>

        <p>
            <span className='font-bold text-2xl'>Total cotización: </span>
            ${res}
        </p>
        
    </div>
  )
}
