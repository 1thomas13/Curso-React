import Project from "../models/Project.js"

export const getProjects = async (req,res)=>{
    const projects = await Project.find().where('creator').equals(req.user)

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

    const project = await Project.findById(id)

    if(!project) {
        return res.status(404).json({msg:'Project not found'})
    }
    
    if(project.creator.toString() !== req.user._id.toString()){
        return res.status(401).json({msg:'you dont have the permissions'})
    }

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

export const addCollaborator = async (req,res)=>{

}

export const deleteCollaborator = async (req,res)=>{

}

export const getTasks = async (req,res)=>{

}