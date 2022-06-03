import Project from "../models/Project.js"
import Task from "../models/Task.js"

export const addTask = async (req,res) =>{
    const {project} = req.body

    const projectExist = await Project.findById(project)

    if(!projectExist){
        const error = new Error('The Project not exist')
        return res.status(404).json({msg: error.message})
    }

    if(projectExist.creator.toString() !== req.user._id.toString()){
        return res.status(401).json({msg:'you dont have the permissions'})
    }

    try {
        const newTasks = await Task.create(req.body)

        projectExist.tasks.push(newTasks._id)
        
        await projectExist.save()

        res.json(newTasks)
    } catch (error) {
        console.log(error)
    }
}

export const getTask = async (req,res) =>{
    const {id} = req.params

    const task = await Task.findById(id).populate('project')

    if(!task){
        const error = new Error('The task not exist')
        return res.status(404).json({msg: error.message})
    }

    if(task.project.creator.toString() !== req.user._id.toString()){
        return res.status(403).json({msg:'you dont have the permissions'})
    }

    res.json(task)
}

export const updateTask = async (req,res) =>{
    const {id} = req.params

    const task = await Task.findById(id).populate('project')

    if(!task){
        const error = new Error('The task not exist')
        return res.status(404).json({msg: error.message})
    }

    if(task.project.creator.toString() !== req.user._id.toString()){
        return res.status(403).json({msg:'you dont have the permissions'})
    }

    task.name = req.body.name || task.name 
    task.description = req.body.description || task.description 
    task.priority = req.body.priority || task.priority 
    task.deliveryDate = req.body.deliveryDate || task.deliveryDate 

    try {
        const updateTask = await task.save()

        res.json(updateTask)
    } catch (error) {
        console.log(error)
    }
}

export const deleteTask = async (req,res) =>{
    const {id} = req.params

    const task = await Task.findById(id).populate('project')

    if(!task){
        const error = new Error('The task not exist')
        return res.status(404).json({msg: error.message})
    }

    if(task.project.creator.toString() !== req.user._id.toString()){
        return res.status(403).json({msg:'you dont have the permissions'})
    }


    try {

        const project = await  Project.findById(task.project)
        project.tasks.pull(task._id)

        await Promise.allSettled([await project.save(), await task.deleteOne()])

        res.json({msg:'Tarea eleminada'})
    } catch (error) {
        console.log(error)
    }
}

export const setStateTask = async (req,res) =>{
    const {id} = req.params

    const task = await Task.findById(id).populate('project')

    if(!task){
        const error = new Error('The task not exist')
        return res.status(404).json({msg: error.message})
    }

    if(task.project.creator.toString() !== req.user._id.toString() && !task.project.
        collaborators.some(collaborator => collaborator._id.toString() === req.user._id.toString() )){
        return res.status(401).json({msg:'Accion no valida'})
    }


    task.state = !task.state
    task.completed = req.user._id

    await task.save()

    const taskAllInfo =  await Task.findById(id).populate('project').populate('completed')

    res.json(taskAllInfo)
}

