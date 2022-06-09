import * as React from "react"
import { ImgHotel } from "../components/ImgHotel"
import {ContentHome} from '../components/ContentHome'
import Layout from "../components/Layout"
import {useRooms} from '../hooks/useRooms'
import {css} from '@emotion/react'
import { PreviewRoom } from "../components/PreviewRoom"
import styled from '@emotion/styled'


const ListRooms = styled.ul`
  max-width: 1200px;
  width: 95%;
  margin: 4rem auto 0 auto;

  @media (min-width:768px) {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    column-gap: 3rem;
  }
`

const IndexPage = () => {

  const rooms = useRooms()

  console.log(rooms)

  return (
  <Layout>
    <ImgHotel/>
    <ContentHome/>
    <h2 css={css`
      text-align: center;
      margin-top: 5rem;
      font-size: 3rem;
    `}>Nuestras Habitaciones</h2>

    <ListRooms>
      {rooms.map((room)=>{
        return <PreviewRoom key={room.id} room={room}/>
      })}
    </ListRooms>
  </Layout>
  )
}
export default IndexPage
