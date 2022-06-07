
import styled from '@emotion/styled'
import { useEffect,useContext,useState } from 'react';
import { Layout } from '../components/layouts/Layout'
import {FirebaseContext} from '../firebase'

import { collection, getDocs } from "firebase/firestore";
import { ProductDetails } from '../components/layouts/ProductDetails';

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

export default function Populares() {

  const [products, setProducts] = useState([]);

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
  
  return (
    <Layout>
      <ProductList>
        <Container >
          <List className='bg-white'>
            {
              products.map(product => {
                {console.log(product)}
                return <ProductDetails key={product.id} product={product} />
              })
            }
          </List>
        </Container>
      </ProductList>
    </Layout>
  )
}
