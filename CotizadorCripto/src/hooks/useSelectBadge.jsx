import React, { useState } from 'react'

import styled from '@emotion/styled'

const Label = styled.label`
  color: #fff;
  display: block;
  font-family: 'Lato',sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 15px 0;
`

const Select = styled.select`
  width:100%;
  padding: 14px;
  border-radius:10px;
  font-size: 18px;
  margin-bottom: 20px;
`

const useSelectBadge = (label, options) => {

  const [state,setState] = useState('')

  const SelectBadge = () => (
    <>
        <Label>{label}</Label>
        <Select value={state} onChange={e=>setState(e.target.value)} >
          <option value=''>Seleccione </option>

          {options.map(op=>{
            return <option key={op.id} value={op.id}>{op.name}</option>
          })}

        </Select>
    </>
  )

    return [state,SelectBadge]
}

export default useSelectBadge