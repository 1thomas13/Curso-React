import {Container} from 'react-bootstrap'
import { DrinksList } from './components/DrinksList'
import { Form } from './components/Form'
import { Modal } from './components/Modal'
import { CategoriesProvider } from './context/CategoriesProvider'
import { DrinksProvider } from './context/DrinksProvider'

function App() {

  return (
    <DrinksProvider>
      <CategoriesProvider>
        <header className='py-5'>
          <h1>Buscador de Bebidas</h1>
        </header>

        <Container className='mt-5'>
          <Form/>
          <DrinksList/>
          <Modal/>
        </Container>
      </CategoriesProvider>
    </DrinksProvider>
  )
}

export default App
