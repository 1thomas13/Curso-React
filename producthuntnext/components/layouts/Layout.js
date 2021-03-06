
import {Fragment} from "react"
import { Global,css } from "@emotion/react"
import { Header } from "./Header"
import Head from "next/head"

export const Layout = ({children}) => {
  return (
    <Fragment>  
        <Global
            styles={css `
                :root {
                    --gray: #3d3d3d;
                    --gray2: #6f6f6f;
                    --orange: #da552f
                }  
                html{
                    font-size: 62.5%;
                    box-sizing:border-box;  
                } 

                *, *:before, *:after {
                    box-sizing: inherit;  
                }
                body {
                    font-size: 1.6rem;
                    line-height: 1.5;
                    font-family:'PT Sans', sans-serif;
                }
                h1, h2 {
                    font-family:'Roboto Slab', serif;
                    font-weight: 700;
                }
                h3 {
                    font-family:'PT Sans', sans-serif;
                }
                h1, h2, h3 {
                    margin: 0 0 2rem 0;
                    line-height: 1.5;
                }
                ul{
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                a {
                    text-decoration:none;
                }
                img {
                    max-width: 100%;
                }
            `}
        />
        <Head>
            <title>Product Hunt</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&family=PT+Sans:wght@400;700&family=Playfair+Display&family=Roboto+Slab:wght@200;300;400;500;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
        </Head>

        <Header/>

        <main>
            {children}
        </main>
    </Fragment>
  )
}
