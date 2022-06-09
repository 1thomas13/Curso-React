import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import {css} from '@emotion/react'
import styled from '@emotion/styled'

const Home = styled.div`
    padding-top: 4rem;
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;

    @media (min-width: 768px){
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }

    p{
        line-height:2;
    }
`

export const ContentHome = () => {

    const  data  = useStaticQuery(graphql`
    query {
        allDatoCmsPage(filter: { slug: { eq: "home" } }) {
              nodes {
              title
              content
              img {
                gatsbyImageData
             }
            }
        }
      }
    `);

    const {title, content, img} = data.allDatoCmsPage.nodes[0]
    

  return (
    <>
        <h2 css={css`
            text-align: center;
            font-size: 4rem;
            margin-top: 4rem;
        `}>{title}</h2>
        
        <Home>
            <p>{content}</p>
            <GatsbyImage image={img.gatsbyImageData} alt="inicio" />
        </Home>
        
    </>
  )
}
