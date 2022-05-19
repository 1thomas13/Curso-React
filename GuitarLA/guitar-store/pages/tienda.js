
import { Layout } from '../components/Layout'
import { List } from '../components/List'

export default function Store({guitars}) {
  return (
    <div >
      <Layout page='tienda'>
  
        <main className='contenedor'>
          <h1 className='heading'>Nuestra Colección</h1>
        
          <List guitars={guitars}/>
        </main>
      </Layout>
    </div>
  )
}

export async function getServerSideProps (){
  const url = `${process.env.API_URL}/guitarras?_sort=created_at:desc`

  const res = await  fetch(url)
  const guitars = await res.json()

  return {
    props:{
      guitars
    }
  }
}
