import { dateFormat } from "../helpers/dateFormat"
import useAdmin from "../hooks/useAdmin"
import useProjects from "../hooks/useProjects"

export const Task = ({task}) => {

  const {handleModalEditTask,handleDeleteTask,handleCompletedTask} = useProjects()

  const admin = useAdmin()
  
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">
          {task.name}
        </p>
        <p className="mb-1 text-sm text-gray-500 uppercase">
          {task.description}
        </p>
        <p className="mb-1 text-sm">
          {dateFormat(task.deliveryDate) }
        </p>
        <p className="mb-1 text-gray-600">
          Prioridad: {task.priority}
        </p>
        {task.state && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
          Completada por: {task.completed.name}
        </p>}
      </div>
    {console.log(task)}
      <div className="flex gap-2 flex-col ">
        {admin && (
          <button onClick={() => handleModalEditTask(task)} className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded">
            Editar
          </button>
        )}
       

        <button onClick={() => handleCompletedTask(task)} className={`${task.state ? 'bg-indigo-600' : 'bg-gray-600'}   px-4 py-3 text-white uppercase font-bold text-sm rounded`}>
          {task.state? 'Completa' : 'Incompleta'}
        </button>

        {admin && (
        <button onClick={() => handleDeleteTask(task)} className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded">
          Eleminar
        </button>
        )}
      </div>
    </div>
  )
}
