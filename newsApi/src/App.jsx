import { useState } from 'react'

import {Container, Grid, Typography} from '@mui/material'
import { Form } from './components/Form'
import { NewsProvider } from './context/NewsProvider'
import { NewsList } from './components/NewsList'


function App() {
 

  return (
    <NewsProvider>
      <Container>
        <header>
          
          <Typography marginY={5} align='center' variant='h3' component='h1'>Buscador de Noticias </Typography>
        </header>

        <Grid container direction='row' justifyContent='center' alignItems='center'>
          <Grid item md={6} xs={12} lg={4}>
            <Form/>
          </Grid>
        </Grid>
        <NewsList/>
      </Container>
    </NewsProvider>
  )
}

export default App
