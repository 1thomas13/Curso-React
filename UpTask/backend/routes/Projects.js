import express from 'express'

import {getProjects,newProject,getProject,editProject,deleteProject, getTasks, addCollaborator, deleteCollaborator} from '../controllers/projects.js'

import { checkAuth } from '../middleware/checkAuth.js'

const router = express.Router()


router.route("/")
    .get(checkAuth, getProjects)
    .post(checkAuth, newProject)

router.route("/:id")
    .get(checkAuth, getProject)
    .put(checkAuth, editProject)
    .delete(checkAuth, deleteProject)

router.get("/tasks/:id", checkAuth, getTasks)
router.post("/addCollaborator/:id", checkAuth, addCollaborator)
router.put("/deleteCollaborator/:id", checkAuth, deleteCollaborator)

export default router