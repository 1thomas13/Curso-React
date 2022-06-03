import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ProjectProvider } from './context/ProjectProvider'
import { AuthLayout } from './layouts/AuthLayout'
import { ProtectedRoute } from './layouts/ProtectedRoute'
import { ConfirmAccount } from './pages/ConfirmAccount'
import { EditProject } from './pages/EditProject'
import { ForgetPassword } from './pages/ForgetPassword'
import Login from './pages/Login'
import { NewCollaborator } from './pages/NewCollaborator'
import { NewPassword } from './pages/NewPassword'
import { NewProject } from './pages/NewProject'
import { Project } from './pages/Project'
import { Projects } from './pages/Projects'
import { Register } from './pages/Register'

function App() {
  

  return (
    <BrowserRouter>
    <AuthProvider>
    <ProjectProvider>
      <Routes>
        <Route path='/' element={<AuthLayout />}> 
          <Route index element={<Login/>} />
          <Route path='registrar' element={<Register/>} />
          <Route path='olvide-mi-password' element={<ForgetPassword/>} />
          <Route path='olvide-mi-password/:token' element={<NewPassword/>} />
          <Route path='confirmar/:id' element={<ConfirmAccount/>} />
        </Route>

        <Route path='/proyectos' element={<ProtectedRoute/>}> 
          <Route index element={<Projects/>} />
          <Route path='crear-proyecto' element={<NewProject/>} />
          <Route path='nuevo-colaborador/:id' element={<NewCollaborator/>} />
          <Route path=':id' element={<Project/>} />
          <Route path='editar/:id' element={<EditProject/>} />
        </Route>
      </Routes>
    </ProjectProvider>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
