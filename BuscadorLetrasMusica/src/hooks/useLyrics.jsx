import React, { useContext } from 'react'
import LyricsContext from '../context/LyricsProvider'

export const useLyrics = () => {

  return (
    useContext(LyricsContext)
  )
}
