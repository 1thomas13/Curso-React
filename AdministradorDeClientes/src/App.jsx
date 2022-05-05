import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import { Layout } from './layout/Layout'
import { Index } from './pages'
import { NewClient } from './pages/NewClient'
import { EditClient } from './pages/EditClient'
import { GetClient } from './pages/GetClient.jsx'

export const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            
            <Route path='/clientes' element={<Layout/>}>
                <Route index element={<Index/>}/>
                <Route path='nuevo' element={<NewClient/>}/>
                <Route path='editar/:id' element={<EditClient/>}/>
                <Route path=':id' element={<GetClient/>}/>
            </Route>

        </Routes>
    </BrowserRouter>
  )
}
