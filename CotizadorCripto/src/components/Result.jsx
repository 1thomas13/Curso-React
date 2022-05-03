import React from 'react'

import styled from '@emotion/styled'

const Res = styled.div`
    color:#fff;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`

const Text = styled.p`
 font-size: 18px;
    span{
        font-weight: 700;
    }
`

const Precio = styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
`

const Img = styled.img`
    display: block;
    width: 150px;
`

export const Result = ({result}) => {

    const {PRICE, HIGHDAY,LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = result
  return (
    <Res>
        <Img src={`https://cryptocompare.com/${IMAGEURL}`} alt='img Crypto'/>
        
       <div>
           <Precio>El precio es de: <span>{PRICE}</span></Precio>
            <Text>Precio mas alto del día: <span>{HIGHDAY}</span></Text>
            <Text>Precio mas bajo del día: <span>{LOWDAY}</span></Text>
            <Text>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Text>
            <Text>Última actualización: <span>{LASTUPDATE}</span></Text>
        </div>
        
    </Res>
  )
}
