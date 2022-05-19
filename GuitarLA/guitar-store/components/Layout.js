import Head from "next/head"
import Footer from "./Footer"
import { Header } from "./Header"

export const Layout = ({children,page, guitar}) => {
  return (
    <div>
        <Head>
            <title>{`Guitar LA - ${page}`}</title>
            <meta name='description' content="Sitio" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&family=Playfair+Display&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
            
        </Head>

        <Header guitar={guitar}/>
        {children}

       <Footer/>

  
    </div>
  )
}

Layout.defaultProps = {
  guitar:null
}