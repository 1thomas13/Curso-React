import React, { createContext, useState } from 'react'
import axios from 'axios'

const LyricsContext = createContext()

const LyricsProvider = ({children}) => {

  const [alert,setAlert] = useState('')
  const [lyrics,setLyrics] = useState('')
  const [loading,setLoading] = useState(false)

  const searchLyric = async(search) =>{
    try {
      setLoading(true)

      const {artist,song} = search
      const url = `https://api.lyrics.ovh/v1/${artist}/${song}`
      const {data} = await axios(url)
      
      setLyrics(data.lyrics)
      setAlert('')
    } catch (error) {
      setAlert('Cancion no encontrada')
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <LyricsContext.Provider value={{loading,lyrics,searchLyric,setAlert,alert}}>
      {children}
    </LyricsContext.Provider>
  )
}

export {
  LyricsProvider
}

export default LyricsContext