import React from 'react'

export const Error = ({msj}) => {
  return (
    <p className='pb-5 text-red-500 text-center font-bold uppercase'>
        {msj}
    </p>
  )
}
