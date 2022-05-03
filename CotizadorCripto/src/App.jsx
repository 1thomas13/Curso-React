import { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import imgCripto from './img/imagen-criptos.png'
import { Form } from './components/form'
import { Result } from './components/Result'
import { Spinner } from './components/Spinner'

const Heading = styled.h1`
  font-family:'Lato', sans-serif;
  color:#fff;
  text-align:center;
  font-weight: 700;
  margin-top:80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width:100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`

const Img = styled.img`
  max-width: 400px;
  width: 80%;
  margin:100px auto 0 auto;
  display: block;
`

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media(min-width: 992px){
    display:grid;
    grid-template-columns: repeat(2,1fr);
    columns-gap: 2rem;
  }
`

function App() {

  const [badges,setBadges] = useState({})
  const [result,setResult] = useState({})
  const [loading,setLoading] = useState(false)

  useEffect(()=>{

    if(Object.keys(badges).length > 0){

      const cotizarCrypto = async()=>{
        setLoading(true)
        setResult({})

        const {badge,cryptocurrencies} = badges

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrencies}&tsyms=${badge}`

        const res = await fetch(url)
        const data = await res.json()

        setResult(data.DISPLAY[cryptocurrencies][badge])
        setLoading(false)
      }

      cotizarCrypto()

    }
  },[badges])

  return (
    <Container>
      <Img src={imgCripto} alt='img cripto'/>
      
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Form setBadges={setBadges}></Form>

        {loading && <Spinner/>}
        {result && result.PRICE && <Result result={result}/>}
      </div>
    </Container>
  )
}

export default App
