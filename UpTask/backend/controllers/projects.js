import Project from "../models/Project.js"
import Task from "../models/Task.js"
import User from "../models/User.js"

export const getProjects = async (req,res)=>{
    const projects = await Project.find({
        '$or': [
            {'collaborators':{$in:req.user}},
            {'creator':{$in:req.user}},
        ]
    }).select('-tasks')


    res.json(projects)
}

export const newProject = async (req,res)=>{
    const project = new Project(req.body)

    project.creator = req.user._id

    try {
        
        const saveProject = await project.save()

        res.json(saveProject)

    } catch (error) {
        console.log(error)
    }
}

export const getProject = async (req,res)=>{
    const {id} = req.params

    const project = await Project.findById(id).populate({path: 'tasks', populate: {path: 'completed', select: 'name'}}).populate('collaborators', 'name email')

    if(!project) {
        return res.status(404).json({msg:'Proyecto No Encontrado'})
    }
    
    if(project.creator.toString() !== req.user._id.toString() && !project.
        collaborators.some(collaborator => collaborator._id.toString() === req.user._id.toString() )){
        return res.status(401).json({msg:'Accion no valida'})
    }

    const tasks = await Task.find().where("project").equals(project.id)



    res.json(project)
}

export const editProject = async (req,res)=>{
    const {id} = req.params

    const project = await Project.findById(id)

    if(!project) {
        return res.status(404).json({msg:'Project not found'})
    }
    
    if(project.creator.toString() !== req.user._id.toString()){
        return res.status(401).json({msg:'you dont have the permissions'})
    }

    project.name = req.body.name || project.name
    project.decription = req.body.decription || project.decription
    project.deliveryDate = req.body.deliveryDate || project.deliveryDate
    project.client = req.body.client || project.client

    try {
        const updateProject = await project.save()
        res.json(updateProject)
    } catch (error) {
        console.log(error)
    }
}

export const deleteProject = async (req,res)=>{
    const {id} = req.params

    const project = await Project.findById(id)

    if(!project) {
        return res.status(404).json({msg:'Project not found'})
    }
    
    if(project.creator.toString() !== req.user._id.toString()){
        return res.status(401).json({msg:'you dont have the permissions'})
    }

    await project.deleteOne()

    try {
        
    res.json({msg:'Proyecto Eleminado Correctamente!'})

    } catch (error) {
        onsole.log(error)
    }

    res.json(project)
}

export const findCollaborator = async (req,res)=>{
    const {email} = req.body

    const user = await User.findOne({email}).select('-confirm -createdAt -password -__v -updatedAt -token')

    if(!user) {
        const error = new Error('Usuario No Encontrado')
        return res.status(404).json({msg:error.message})
    }

    res.json(user)
}

export const addCollaborator = async (req,res)=>{
    const project = await Project.findById(req.params.id)

    if(!project){
        const error = new Error('Proyecto No Encontrado')
        return res.status(404).json({msg:error.message})
    }

    if(project.creator.toString() !== req.user._id.toString()){
        const error = new Error('Accion No Valida')
        return res.status(404).json({msg:error.message})
    }

    const {email} = req.body

    const user = await User.findOne({email}).select('-confirm -createdAt -password -__v -updatedAt -token')

    if(!user) {
        const error = new Error('Usuario No Encontrado')
        return res.status(404).json({msg:error.message})
    }

    if(project.creator.toString() === user._id.toString()) {
        const error = new Error('Accion No Valida')
        return res.status(404).json({msg:error.message})
    }

    if(project.collaborators.includes(user._id)){
        const error = new Error('El Usuario Ya Pertenece Al Proyecto')
        return res.status(404).json({msg:error.message})
    }

    project.collaborators.push(user._id)

    await project.save()

    res.json({msg:'Colaborador Agregado Correctamente'})
}

export const deleteCollaborator = async (req,res)=>{
    const project = await Project.findById(req.params.id)

    if(!project){
        const error = new Error('Proyecto No Encontrado')
        return res.status(404).json({msg:error.message})
    }

    if(project.creator.toString() !== req.user._id.toString()){
        const error = new Error('Accion No Valida')
        return res.status(404).json({msg:error.message})
    }

   
    project.collaborators.pull(req.body.id)

    await project.save()

    res.json({msg:'Colaborador Eleminado Correctamente'})
}

export const getTasks = async (req,res)=>{

}