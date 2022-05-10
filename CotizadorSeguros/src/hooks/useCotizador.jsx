import {useContext} from 'react'
import QuoterContext from '../context/ProviderQuoter'

const useCotizador = ()=>{
    return useContext(QuoterContext)
}

export default useCotizador