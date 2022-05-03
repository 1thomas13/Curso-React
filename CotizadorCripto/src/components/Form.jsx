import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Error } from './error'
import useSelectBadge from '../hooks/useSelectBadge'
import  badges  from '../data/badges,js'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color:#fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s;
    margin-top: 30px;
    &:hover{
        background-color: #7a7dfe;
        cursor: pointer;
    }
`

    

export const Form = ({setBadges}) => {
    const [cryptos,setCryptos] = useState([])
    const [badge,SelectBadge] = useSelectBadge('Elige tu Moneda',badges)
    const [cryptocurrencies,SelectCripto] = useSelectBadge('Elige tu Criptomoneda',cryptos)
    
    const [error,setError] = useState(false)

    const handleSubmit =(e)=>{
        e.preventDefault()

        if([badge,cryptocurrencies].includes('')){
            return setError(true)
        }

        setError(false)
        setBadges({
            badge,
            cryptocurrencies
        })
    }

    useEffect(()=>{
        const getCriptos = async()=>{
            const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'

            const response = await fetch(url)
            
            const {Data} = await response.json()
            
            const arrayCriptos = Data.map((crypto)=>{

                const objectCrypto ={
                    id: crypto.CoinInfo.Name,
                    name: crypto.CoinInfo.FullName
                }
                
                return objectCrypto
            })

            setCryptos(arrayCriptos)
        }
        getCriptos()

        
    },[])

  return (
      <>
      {error && <Error >Todos los compos son obligatorios</Error>}
        <form onSubmit={handleSubmit}>
            <SelectBadge/>
            <SelectCripto/>
            <InputSubmit type='submit' value='Cotizar'/>
        </form>
    </>
  )
}
