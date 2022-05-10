import { useState } from 'react'
import { AppInsurance } from './components/AppInsurance'
import {QuoterProvider} from './context/ProviderQuoter'

function App() {
  

  return (
    <QuoterProvider >
      
      <AppInsurance/>
    </QuoterProvider>
  )
}

export default App
