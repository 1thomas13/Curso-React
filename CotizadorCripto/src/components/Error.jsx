import React from 'react'
import styled from '@emotion/styled'

const Text = styled.div`
    background-color: #87322c;
    color: #fff;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: 'lato', sans-serif;
    font-weight: 700;
    text-align: center;
`

export const Error = ({children}) => {
  return (
    <Text>{children}</Text>
  )
}
