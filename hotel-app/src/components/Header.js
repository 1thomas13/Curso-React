import React from 'react'
import {css} from '@emotion/react'
import { Nav } from './Nav'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const LinkHome = styled(Link)`
  color: white;
  text-align: center;
  text-decoration: none;
`

const Header  = () => {
  return (
    <header 
      css={css`
        background-color: rgba(44,62,80);
        padding: 1rem;
      `}
    >
        <div css={css`
            max-width: 1200px;
            margin: 0 auto;

            @media (min-width: 768px){
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
        `}>
          <LinkHome to='/'>
            <h1 css={css`
                color: #ffff;
                text-align: center;
            `}>
                Hotel Gatsby
            </h1>
            </LinkHome>
            <Nav/>
        </div>
    </header>
  )
}

export default Header