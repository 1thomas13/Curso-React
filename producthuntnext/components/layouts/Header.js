
import Link from 'next/link'
import { Search } from '../ui/Search'
import { Nav } from './Nav'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import { Button } from '../ui/Button'
import { Fragment } from 'react'
import { FirebaseContext } from '../../firebase' 
import { useContext } from 'react'

const HeaderContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px){
        display: flex;
        justify-content: space-between;
    }
`

const Logo = styled.p`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`

export const Header = () => {

    const {user,firebase} = useContext(FirebaseContext)

  return (
    <header css={css`
        border-bottom: 2px solid #e1e1e1;
        padding: 1rem 0;
    `}>
        <HeaderContainer>
            <div css={css`
                display: flex;
                align-items: center;
            `}>
                <Link href='/'>
                    <Logo>
                        P
                    </Logo>
                </Link>
               

                <Search/>
                <Nav/>
            </div>
            <div css={css`
                display: flex;
                align-items: center;
            `}>
                {user ? (
                <Fragment>
                    <p css={css`
                        margin-right: 2rem;
                        align-items: center;
                    `}>
                        Hola: {user.displayName}
                    </p>
                    <Button onClick={()=> firebase.logout()} bgColor='true'>Cerrar Sesión</Button>
                </Fragment>) : (
                <Fragment>
                    
                    <Link href='/login'>
                        <Button bgColor='true'>Login</Button>
                    </Link>
                    <Link href='/crear-cuenta'>
                        <Button bgColor=''>Crear Cuenta</Button>
                    </Link>
                </Fragment>
                )}
            </div>
        </HeaderContainer>
    </header>
  )
}
