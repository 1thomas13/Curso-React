import React from 'react'
import { useLyrics } from '../hooks/useLyrics'
import { Alert } from './Alert'
import { Form } from './Form'
import { Lyrics } from './Lyrics'

export const AppLyrics = () => {

    const {lyrics,alert,loading} = useLyrics()

  return (
    <>
        <header>Busqueda de letras de canciones</header>

        <Form/>

        <main>
        {alert ? <Alert>{alert}</Alert> :
         lyrics ? <Lyrics/> :
         loading ? 'Cargando...' :
         <p className='text-center'>Busca letras de tus artistas favoritos</p>}
        </main>
    </>
  )
}
