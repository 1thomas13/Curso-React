import Image from 'next/image'
import {useRouter} from 'next/router'
import { Layout } from '../../components/Layout'
import { dateFormat} from '../../helpers'
import styles from '../../styles/Entrada.module.css'
const EntradaBlog = ({resJson}) => {

    const {contenido,img,published_at,titulo} = resJson

  return (
    <Layout page={titulo}>
        <main className='contenedor'>
            <h1 className='heading'>{titulo}</h1>
            <article className={styles.entrada}>
                <Image layout='responsive' width={800} height={600} src={'http://localhost:1337'+img.url} alt={`img blog ${titulo}`} />

                <div className={styles.contenido}>
                    <p className={styles.fecha}>{dateFormat(published_at)}</p>
                    <p className={styles.texto}>{contenido}</p>
                </div>
            </article>
        </main>
    </Layout>
  )
}

export async function getStaticPaths (){
    const url = `${process.env.API_URL}/blogs`

    const res = await fetch(url)
    const resJson = await res.json()

    const paths = resJson.map(entrada =>({
        params:{url:entrada.url}
    }))

    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps({params: {url}}) {
    
    const urlGet = `${process.env.API_URL}/blogs?url=${url}`
    
    const res = await fetch(urlGet)
      
    const resJson = await res.json()
      
    console.log(resJson)
    return {
        props: {
            resJson:resJson[0]
        }
    }
}

// export async function getServerSideProps({query: {id}}) {

//     const url = `http://localhost:1337/blogs/${id}`

//     const res = await fetch(url)
  
//     const resJson = await res.json()
  

//     return {
//         props: {
//             resJson
//         }
//     }
// }

export default EntradaBlog