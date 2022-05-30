import {BrowserRouter,Routes,Route} from 'react-router-dom'

import { AuthLayout } from './layouts/AuthLayout'
import { ConfirmAccount } from './pages/ConfirmAccount'
import { ForgetPassword } from './pages/ForgetPassword'
import Login from './pages/Login'
import { NewPassword } from './pages/NewPassword'
import { Register } from './pages/Register'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}> 
          <Route index element={<Login/>} />
          <Route path='registrar' element={<Register/>} />
          <Route path='olvide-mi-contraseña' element={<ForgetPassword/>} />
          <Route path='olvide-mi-contraseña/:token' element={<NewPassword/>} />
          <Route path='confirmar/:id' element={<ConfirmAccount/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
