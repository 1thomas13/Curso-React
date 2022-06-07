
import { Layout } from '../components/layouts/Layout'
import {useRouter} from 'next/router'
import { useEffect,useContext,useState } from 'react';
import {FirebaseContext} from '../firebase'
import { collection, getDocs } from "firebase/firestore";
import { ProductDetails } from '../components/layouts/ProductDetails';
import styled from '@emotion/styled'

const ProductList = styled.div`
  background-color: #f3f3f3;
`

const Container = styled.div`
  max-width: 1200px;
  width: 95%;
  padding: 5rem 0;
  margin: 0 auto;
`

const List = styled.ul`
  background-color: #FFF;
`

export default function SearchPage() {

  const router = useRouter()
  const {query:{q}} = router
  

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  const {firebase} = useContext(FirebaseContext)

  useEffect(() => {
    const getProducts = async() => {
      const data = []
      const querySnapshot = await getDocs(collection(firebase.db, "products"));
      querySnapshot.forEach((doc) => {

        data.push({ ...doc.data(), id: doc.id })
        
        setProducts(data)
    
      })
    }
    getProducts()
  }, []);

  useEffect(() => {
   const search = q.toLowerCase()
   const filter = products.filter(product => {
     return (product.name.toLowerCase().includes(search) )
   })

   setFilter(filter)
  }, [q,products]);
  
  return (
    <Layout>
      <ProductList>
        <Container >
          <List className='bg-white'>
            {
              filter.map(product => {
                return <ProductDetails key={product.id} product={product} />
              })
            }
            {filter.length === 0 && <h2>No se encontraron Productos</h2>}
          </List>
        </Container>
      </ProductList>
    </Layout>
  )
}
