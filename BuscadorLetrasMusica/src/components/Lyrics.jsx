import React from 'react'
import { useLyrics } from '../hooks/useLyrics'

export const Lyrics = () => {

    const {lyrics,loading} = useLyrics()

  return (
    loading ? 'Cargando...' :
    <div className='letra'>{lyrics}</div>
  )
}
