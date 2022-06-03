import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom"
import useProjects from "../hooks/useProjects"
import { ModalFormTask } from "../components/ModalFormTask";
import { Task } from "../components/Task";
import { ModalDeleteTask } from "../components/modalDeleteTask";
import { Alert } from "../components/Alert";
import { Collaborator } from "../components/Collaborator";
import { ModalDeleteCollaborator } from "../components/ModalDeleteCollaborator";
import useAdmin from "../hooks/useAdmin";
import io from 'socket.io-client'

let socket

export const Project = () => {

    const {changeStateTask,editTaskProject,deleteTaskProject,getProject,project,loading,handleModalTask,alert,submitTaskProject} = useProjects()
    
    const admin = useAdmin()

    const [modal, setModal] = useState(false);

    useEffect(() => {
        getProject(params.id)
    }, []);

    const params = useParams()

    const {msg} = alert

    useEffect(() => {
      socket = io(import.meta.env.VITE_BACK_URL)
      socket.emit('openProject', params.id)
    }, []);

    useEffect(() => {
      socket.on('addTask', (newTask) => {
        if(newTask.project === project._id){
          submitTaskProject(newTask)
        }
      })

      socket.on('deletedTask', (deletedTask) => {
        if(deletedTask.project === project._id){
          deleteTaskProject(deletedTask)
        }
      })

      socket.on('updatedTask', (updatedTask) => {
        if(updatedTask.project._id === project._id){
          editTaskProject(updatedTask)
        }
      })

      socket.on('changedTask', (changedTask) => {
        if(changedTask.project._id === project._id){
          changeStateTask(changedTask)
        }
      })
    });

    if(loading) return 'Cargando...'

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">
            {project.name}
        </h1>
        {admin && (
          <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>

          <Link className="uppercase font-bold" to={`/proyectos/editar/${params.id}`}>
            Editar
          </Link>
          </div>
        )}
      </div>
      {admin && (
        <button onClick={()=> setModal(handleModalTask)} type="button" className="flex gap-2 mt-5 items-center justify-center text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Nueva Tarea
        </button>
      )}
        <p className="font-bold text-xl mt-10">Tareas Del Proyecto</p>

        <div className="flex justify-center"> 
          <div className="w-full md:w-1/3 lg:w-1/4">
            {msg && <Alert alert={alert}/>}
          </div>
        </div>

        <div className="bg-white shadow mt-10 rounded-lg">
          {project.tasks?.length ? 
          project.tasks?.map(task => (
            <Task key={task._id} task={task}/>
          )) : 
          <p className="text-center my-5 p-10">No Tiene Ninguna Tarea</p>}
        </div>
        {admin && (
          <>
          <div className="flex items-center justify-between ">
            <p className="font-bold text-xl mt-10">Colaboradores</p>
            <Link className="hover:text-black text-gray-400 uppercase font-bold" to={`/proyectos/nuevo-colaborador/${project._id}`}>
              Añadir
            </Link>
          </div>

          <div className="bg-white shadow mt-10 rounded-lg">
            {project.collaborators?.length ? 
            project.collaborators?.map(col => (
              <Collaborator key={col._id} collaborator={col}/>
            )) : 
            <p className="text-center my-5 p-10">No Hay Colaboradores En este Proyecto</p>}
          </div>
          </>
        )}
        <ModalDeleteCollaborator/>
        <ModalFormTask/>
        <ModalDeleteTask/>
    </>
  )
}
