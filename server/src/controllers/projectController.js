import projectModel from "../models/projectModel.js";

const createProject = async (req,res) => {
    const data = req.body.map((item) => {
        return{
            ...item,
            user: req.user._id
        }
    });
    console.log(data);
    const projectCreated = await projectModel.create(data);
    res.json(projectCreated);
}
const getProjects = async (req,res) => {
    const projects = await projectModel.find();
    res.json(projects);
}
const getProjectbyId = async (req,res) => {
    const projectFound = await projectModel.findById(req.params.id);
    res.json(projectFound);
}

 

const updateProject = async (req, res) => {
    try
    {
        const projectUpdated = await projectModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } 
         );
    
        if (!projectUpdated) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
         }
    
        res.json(projectUpdated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProject = async (req,res) => {
    const projectDeleted = await projectModel.findByIdAndDelete(req.params.id);
    res.json(projectDeleted);
}
export default {createProject,getProjects,updateProject,deleteProject,getProjectbyId}