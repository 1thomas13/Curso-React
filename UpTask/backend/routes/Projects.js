import express from 'express'

import {getProjects,newProject,getProject,editProject,deleteProject, getTasks, addCollaborator, deleteCollaborator, findCollaborator} from '../controllers/projects.js'

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

router.post("/collaborators", checkAuth, findCollaborator)
router.post("/collaborators/:id", checkAuth, addCollaborator)
router.post("/delete-collaborators/:id", checkAuth, deleteCollaborator)

export default router