import React, { useState } from 'react'
import { useWeather } from '../hooks/useWeather'

export const Form = () => {

    const {search,searchData,cheackWeather} = useWeather()

    const [alert,setAlert] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            return
        }
        cheackWeather(search)
        setAlert('')
    }

  return (
    <div className='contenedor'>
        {alert && <p>{alert}</p>}
        <form onSubmit={handleSubmit}>
            <div className='campo'>
                <label htmlFor='city'>Cuidad</label>
                <input onChange={searchData} value={search.city} type='text' id='city' name='city' />
            </div>

            <div className='campo'>
                <label htmlFor='country'>Pais</label>
                <select onChange={searchData} value={search.country} type='text' id='country' name='country' >

                    <option value=''>Seleccione un Pais</option>
                    <option value='AR'>Argentina</option>
                    <option value='CO'>Colombia</option>
                    <option value='Cr'>Costa Ricca</option>
                    <option value='US'>Estados Unidos</option>
                    <option value='ES'>España</option>
                    <option value='MX'>México</option>
                    <option value='PE'>Perú</option>
                </select>
            </div>
            <input type='submit' value='Consultar Clima'>
            </input>
        </form>
    </div>
  )
}
