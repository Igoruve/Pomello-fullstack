import projectModel from "../models/projectModel.js";

const createProject = async (req,res) => {
    const projectCreated = await projectModel.create(req.body);
    res.json(projectCreated);
}
const getProject = async (req,res) => {
    const projects = await projectModel.find();
    res.json(projects);
}
const getProjectbyId = async (req,res) => {
    const projectFound = await projectModel.findById(req.params.id);
    res.json(projectFound);
}

const updateProject = async (req,res) => {
    const projectUpdated = await projectModel.findByIdAndUpdate(req.params.id,req.body);
    res.json(projectUpdated);
}
const deleteProject = async (req,res) => {
    const projectDeleted = await projectModel.findByIdAndDelete(req.params.id);
    res.json(projectDeleted);
}
export default {createProject,getProject,updateProject,deleteProject,getProjectbyId}