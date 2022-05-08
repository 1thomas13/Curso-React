import { useState } from 'react'
import { AppInsurance } from './components/AppInsurance'
import {QuoterProvider} from './context/ProviderQuoter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <QuoterProvider >
      
      <AppInsurance/>
    </QuoterProvider>
  )
}

export default App
