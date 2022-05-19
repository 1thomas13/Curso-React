import {List} from '../components/List'
import { Layout } from '../components/Layout'
import { Curso } from '../components/Curso'
import { ListBlog } from '../components/ListBlog'

export default function Home({guitars,cursos,blogs}) {

  return (
    <Layout page='inicio' guitar={guitars[3]}>
      <main className='contenedor'>
        <h1>Nuestra Colección</h1>

        <List guitars={guitars}/>
      </main>

      <Curso cursos={cursos}/>
      <section className='contenedor'>
         <ListBlog blogs={blogs}/>
      </section>

    </Layout>
    
  )
}

export async function getServerSideProps (){

  const urlGuitar = `${process.env.API_URL}/guitarras?_sort=created_at:desc`
  const urlCursos = `${process.env.API_URL}/cursos`
  const urlBlogs = `${process.env.API_URL}/blogs?_limit=3&_sort=created_at:desc`


  const [resGuitar,resCursos,resBlogs] = await Promise.all([

    fetch(urlGuitar),
    fetch(urlCursos),
    fetch(urlBlogs)

  ])

  const [guitars,cursos,blogs] = await Promise.all([
    resGuitar.json(),
    resCursos.json(),
    resBlogs.json()
  ])

  return {
    props:{
      guitars,
      cursos,
      blogs
    }
  }
}
