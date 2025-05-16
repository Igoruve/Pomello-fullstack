import listModel from "../models/listModel.js";


const createList = async (req,res) => {
    const listCreated = await listModel.create(req.body);
    res.json(listCreated);
}
const getLists = async (req,res) => {
    const lists = await listModel.find();
    res.json(lists);
}

const getListById = async (req,res) => {
    const listFound = await listModel.findById(req.params.id);
    res.json(listFound);
}

const getListsByProject = async (req, res) => {
  try {
    const lists = await listModel.find({ project: req.params.projectId });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateList = async (req,res) => {
    const listUpdated = await listModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
      new: true,
      runValidators: true
      } 
    );
    res.json(listUpdated);
}

const deleteList = async (req,res) => {
    const listDeleted = await listModel.findByIdAndDelete(req.params.id);
    res.json(listDeleted);
}

export default {createList,getListsByProject,getLists,getListById,updateList,deleteList};