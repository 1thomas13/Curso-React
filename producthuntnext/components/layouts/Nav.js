import Link from 'next/link'
import React,{useContext} from 'react'
import styled from '@emotion/styled'
import { FirebaseContext } from '../../firebase'

const NavBar = styled.nav`
  padding-left: 2rem;

  a{
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray2);
    font-family: 'PT Sans',sans-serif;

    &:last-of-type {
      margin-right: 0;
    }
  }
`

export const Nav = () => {

  const {user} = useContext(FirebaseContext)

  return (
    <NavBar>
        <Link href='/'>Inicio</Link>
        <Link href='/populares'>Populares</Link>
        {user && (<Link href='/nuevo-producto'>Nuevo Producto</Link>)}
        
    </NavBar>
  )
}
