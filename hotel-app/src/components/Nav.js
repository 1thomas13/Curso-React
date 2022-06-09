import React from 'react'
import styled from '@emotion/styled'
import {Link} from 'gatsby'

const Navbar = styled.nav`
    display: flex;
    justify-content: center;
    padding-bottom: 3rem;

    @media (min-width: 768px){
        padding: 0;
    }
`

const NavLink = styled(Link)`
    color: #fff;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1rem;
    font-family: 'PT sans', sans-serif;
    text-decoration: none;
    padding: 1rem;
    margin-right: 1rem;

    &:last-of-type {
        margin-right: 0;
    }

    &.actualPage {
        border-bottom: 2px solid #fff;
    }
`

export const Nav = () => {
  return (
    <Navbar>
        <NavLink activeClassName='actualPage' to='/'>Inicio</NavLink>
        <NavLink activeClassName='actualPage' to='/nosotros'>Nosotros</NavLink>
    </Navbar>
  )
}
