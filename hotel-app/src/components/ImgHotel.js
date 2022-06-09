import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import style from '@emotion/styled'
import styled from '@emotion/styled'

const BgImg = styled(BackgroundImage)`
    height: 700px;

`

const ImgText = styled.div`
    background-image: linear-gradient(to top, rgba(34,39,63,.80), rgba(34,39,63,.8) );
    color: #fff;
    height:100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;

    h1{
        font-size: 4rem;
        margin:0%;

        @media (min-width: 992px) {
            font-size: 5.8rem;
        }
    }

    p{
        font-size: 2rem;

        @media (min-width: 992px) {
            font-size: 2.6rem;
        }
    }
`

export const ImgHotel = () => {

    const { image } = useStaticQuery(graphql`
    query{
        image: file(relativePath: { eq: "9.jpg" } ) {
            sharp: childImageSharp {
                fluid(quality: 90, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
    `);

  return (
    <BgImg tag='section' fluid={image.sharp.fluid} fadeIn='soft' >
        <ImgText>
            <h1>Bienvenido a Hotel Gatsby</h1>
            <p>El Mejor Hotel para tus Vacaciones</p>
        </ImgText>
    </BgImg>
  )
}
