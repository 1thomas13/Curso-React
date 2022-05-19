
import { Layout } from '../components/Layout'
import { Entrada } from '../components/Entrada'
import styles from '../styles/Blog.module.css'
import { ListBlog } from '../components/ListBlog'

export default function Blog({blogs}) {

  return (
    <div >
      <Layout page='Blog'>
        <main className='contenedor'>
         
          <ListBlog blogs={blogs}/>

        </main>
      </Layout>
    </div>
  )
}

export async function getStaticProps(){

  const url = `${process.env.API_URL}/blogs`

  console.log(url)

  const res = await fetch(url)

  const blogs = await res.json()

  return {
    props:{
      blogs
    }
  }
}