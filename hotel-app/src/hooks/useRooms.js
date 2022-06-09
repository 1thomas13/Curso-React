import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import React from 'react'

export const useRooms = () => {

    const  data  = useStaticQuery(graphql`
    query {
        allDatoCmsRoom{
		nodes {
				title
            id
            slug
            content
            img {
                gatsbyImageData
            }
          }
        }
    }
    `);

   return data.allDatoCmsRoom.nodes.map(room => ({
        title: room.title,
        id: room.id,
        content: room.content,
        img: room.img,
        slug: room.slug,
   }))

}
export default useRooms

