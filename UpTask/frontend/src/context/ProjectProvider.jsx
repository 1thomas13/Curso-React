import {createContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import useAuth from '../hooks/useAuth'
import io from 'socket.io-client'

const ProjectContext = createContext()

let socket

const ProjectProvider = ({children}) => {

  const [projects,setProjects] = useState([])
  const [alert,setAlert] = useState({})
  const [project,setProject] = useState({})
  const [loading,setLoading] = useState(false)
  const [modalFormTask, setModalFormTask] = useState(false);
  const [task, setTask] = useState({});
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [collaborator,setCollaborator] = useState({})
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
  const [search, setSearch] = useState(false);

  const navigate = useNavigate()

  const {auth} = useAuth()

  const showAlert =(alert) => {
    setAlert(alert)

    setTimeout(() => {
      setAlert({})
    }, 3000);
  }

  const submitProject = async(project) =>{

    if(project.id){
      await editProject(project)
      return
    }

    await newProject(project)

  }

  const newProject = async project => {
    
    try {

      const token = localStorage.getItem('token')

      if(!token) return

      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const {data} = await axiosClient.post('/projects',project, config)

      setProjects([...projects,data])

      setAlert({msg:'Proyecto Creado Correctamente',error:false})

      setTimeout(() => {
        setAlert({})
        navigate("/proyectos")
      }, 3000);

    } catch (error) {
      console.log(error)
    }
  }

  const editProject = async project => {
    try {
      const token = localStorage.getItem('token')

      if(!token) return

      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const {data} = await axiosClient.put(`/projects/${project.id}`,project, config)

      const updatedProjects = projects.map(projectState => projectState._id === data._id ? data : projectState)

      setProjects(updatedProjects)

      setAlert({msg:'Proyecto Actualizado Correctamente',error:false})

      setTimeout(() => {
        setAlert({})
        navigate("/proyectos")
      }, 3000);


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getProjects = async () => {
      try {
        
      const token = localStorage.getItem('token')

      if(!token) return

      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const {data} = await axiosClient('/projects', config)
      setProjects(data)

      } catch (error) {
        console.log(error)
      }
    }

    getProjects()

  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACK_URL)
  }, []);

  useEffect(() => {
    socket.on('addTask', (newTask) => {
      submitTaskProject(newTask)
    })
  });

  const getProject = async(id) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')

      if(!token) return

      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const {data} = await axiosClient(`/projects/${id}`, config)

      setProject(data)

      setAlert({})
    } catch (error) {

      navigate('/proyectos')
      setAlert({msg:error.response.data.msg,error:true})
      setTimeout(() => {
        setAlert({})
      }, 3000);

      console.log(error)
    }
    setLoading(false)
  }

  const deleteProject = async id => {
    try {
      const token = localStorage.getItem('token')

      if(!token) return

      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const {data} = await axiosClient.delete(`/projects/${id}`, config)

      setAlert({msg:'Proyecto Eleminado Correctamente',error:false})

      const updatedProjects = projects.filter(projectState => {
        return projectState._id !== id
      })

      setProjects(updatedProjects)

      setTimeout(() => {
        setAlert({})
        navigate("/proyectos")
      }, 3000);

    } catch (error) {
      console.log(error)
    }
  }

  const handleModalTask = () => {
    setModalFormTask(!modalFormTask)
    setTask({})
  }

  const submitTask = async(task) => {

    if(task?.id){
      await editTask(task)
      return
    }

    await createTask(task)
    
  }

  const editTask = async(task) => {
    try {
      const token = localStorage.getItem('token')

      if(!token) return

      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const {data} = await axiosClient.put(`/tasks/${task.id}`, task, config)

      setAlert({})

      socket.emit('updateTask',data)

    } catch (error) {
      console.log(error)
    }
  }
  const createTask = async(task) => {
    try {
      const token = localStorage.getItem('token')

      if(!token) return

      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const {data} = await axiosClient.post(`/tasks`,task, config)

      setAlert({})

      socket.emit('createTask', data)

    } catch (error) {
      console.log(error)
    }
  }

  const handleModalEditTask = (task) => {
    setTask(task)
    setModalFormTask(true)
  }

  const handleDeleteTask = (task) => {
    setTask(task)
    setShowDeleteTask(!showDeleteTask)
  }

  const deleteTask = async (task) => {
    
    try {
      const token = localStorage.getItem('token')

      if(!token) return

      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      
      const {data} = await axiosClient.delete(`/tasks/${task._id}`, config)
      
      setAlert({msg:data.msg,error:false})

      setShowDeleteTask(false)

      socket.emit('deleteTask',task)

      setTask({})

      setTimeout(() => {
        setAlert({})
      }, 3000);

    } catch (error) {
      console.log(error.response)
    }
  }

  const submitCollaborator = async email => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')

      if(!token) return
      
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      
      const {data} = await axiosClient.post(`projects/collaborators`, {email},config)

      setCollaborator(data)
      setAlert({})
    } catch (error) {
      setAlert({msg:error.response.data.msg,error:true})
    }
    setLoading(false)
  }

  const addCollaborator = async(email) => {
    try {

      const token = localStorage.getItem('token')

      if(!token) return
      
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      
      const {data} = await axiosClient.post(`projects/collaborators/${project._id}`, email,config)

      setTimeout(() => {
        setAlert({msg:data.msg,error:false})
      }, 3000);

      setCollaborator()
      
    } catch (error) {
      setAlert({msg:error.response.data.msg,error:true})
    }
  }

  const handleModalDeleteCollaborator = (collaborator) => {
    setModalDeleteCollaborator(!modalDeleteCollaborator)
    setCollaborator(collaborator)
  }

  const deleteCollaborator = async(collaborator) => {
    
    try {
      const token = localStorage.getItem('token')

      if(!token) return
      
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      
      const {data} = await axiosClient.post(`projects/delete-collaborators/${project._id}`, {id:collaborator._id},config)

      const updatedProject = {...project}

      updatedProject.collaborators = updatedProject.collaborators.filter( collaboratorState => collaboratorState._id !== collaborator._id)

      setProject(updatedProject)

      setAlert({msg:data.msg,error:false})
      setCollaborator({})
      setModalDeleteCollaborator(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCompletedTask = async(task) => {
    try {

      const token = localStorage.getItem('token')

      if(!token) return

      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    
      const {data} = await axiosClient.patch(`/tasks/state/${task._id}`, {},config)

      socket.emit('changeState', data)

      setTask({})
      setTask({})

    } catch (error) {
      console.log(error.response)
    }
  }
  
  const handleSearch = () => {
    setSearch(!search)
  }

  const submitTaskProject = (task) => {
    const updatedProject = {...project}

    updatedProject.tasks = [...updatedProject.tasks, task ]

    setProject(updatedProject)
  }

  const deleteTaskProject = (task) => {
    const updatedProject = {...project}
     
    updatedProject.tasks = updatedProject.tasks.filter(taskState => taskState._id !== task._id ) 

    setProject(updatedProject)
  }

  const editTaskProject = (task) => {
    const updatedProject = {...project}

    updatedProject.tasks = updatedProject.tasks.map(taskState => 
                            taskState._id === task._id ? task : taskState
                          ) 

    setProject(updatedProject)

  }

  const changeStateTask= task => {
    const updateProject = {...project}

    updateProject.tasks = updateProject.tasks.map(taskState => 
      taskState._id === task._id ? task : taskState
    )
  
    setProject(updateProject)
  }

  const closeSessionProjects = () => {
    setProjects([])
    setProject({})
    setAlert({})
  }

  return (
    <ProjectContext.Provider  value={{modalFormTask,handleModalTask,
                                deleteProject,loading,
                                project,getProject,
                                projects,alert,showAlert,
                                submitProject,submitTask,
                                handleModalEditTask,task,
                                showDeleteTask,handleDeleteTask,
                                deleteTask,submitCollaborator,
                                collaborator,addCollaborator,
                                handleModalDeleteCollaborator,modalDeleteCollaborator,
                                deleteCollaborator,handleCompletedTask,
                                handleSearch,search,
                                submitTaskProject,deleteTaskProject,
                                editTaskProject, changeStateTask,
                                closeSessionProjects
                              }}>
      {children}
    </ProjectContext.Provider>
    
  )
}

export {ProjectProvider}

export default ProjectContext

