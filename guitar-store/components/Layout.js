import Head from "next/head"
import { Header } from "./Header"

export const Layout = ({children,page}) => {
  return (
    <div>
        <Head>
            <title>{`Guitar LA - ${page}`}</title>
            <meta name='description' content="Sitio Web de venta de guitarras"/>
        </Head>

        <Header/>
        <p>{children}</p>

       

        {/* <Footer/> */}
    </div>
  )
}
