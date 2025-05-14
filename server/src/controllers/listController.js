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

const updateList = async (req,res) => {
    const listUpdated = await listModel.findByIdAndUpdate(req.params.id,req.body);
    res.json(listUpdated);
}

const deleteList = async (req,res) => {
    const listDeleted = await listModel.findByIdAndDelete(req.params.id);
    res.json(listDeleted);
}

export default {createList,getLists,getListById,updateList,deleteList};