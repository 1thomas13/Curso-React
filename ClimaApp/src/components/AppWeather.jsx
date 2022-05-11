import React from 'react'
import { useWeather } from '../hooks/useWeather'
import { Form } from './Form'
import { Result } from './Result'
import { Spinner } from './Spinner'

export const AppWeather = () => {

    const {res,loading,noResult} = useWeather()
    console.log(loading)
    console.log(res)
    console.log(noResult)
  return (
    <>
        <main className='dos-columnas'>
            <Form/>
            {   
                loading ? <Spinner/> : 
                res?.name ? <Result/> : 
                noResult ? <p>{noResult}</p>
                : <p>El clima se va a mostrar aquí</p>
            }
        </main>
    </>
  )
}
