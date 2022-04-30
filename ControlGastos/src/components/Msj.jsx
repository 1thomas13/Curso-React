import React from 'react'

export const Msj = ({children,type}) => {

  return (
    <div className={`alerta ${type}`}> 
        {children}
    </div>
  )
}
