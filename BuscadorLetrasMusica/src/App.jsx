import { useState } from 'react'
import { AppLyrics } from './components/AppLyrics'
import { LyricsProvider } from './context/LyricsProvider'


function App() {


  return (
    <LyricsProvider>
    
      <AppLyrics/>

    </LyricsProvider>
  )
}

export default App
