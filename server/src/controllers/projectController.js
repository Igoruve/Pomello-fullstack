import projectModel from "../models/projectModel.js";

import listModel from "../models/listModel.js";
import taskModel from "../models/taskModel.js";

const createProject = async (req, res) => {
	try {
		const data = {
			...req.body,
			user: req.user._id,
		};

		console.log(data);
		const projectCreated = await projectModel.create(data);
		res.json(projectCreated);
	} catch (error) {
		console.error("Error creating project: ", error);
		res.status(500).json({ message: error.message });
	}
};

const getProjects = async (req, res) => {
	const projects = await projectModel.find();
	res.json(projects);
}

const getProjectbyId = async (req, res) => {
	try {
		const projectId = req.params.id.trim();

		const project = await projectModel.findById(projectId);
		if (!project) return res.status(404).json({ message: "Project not found" });

		const lists = await listModel.find({ project: projectId });

		const listIds = lists.map(list => list._id);
		const tasks = await taskModel.find({ list: { $in: listIds } });

		const listsWithTasks = lists.map(list => {
			const listTasks = tasks.filter(task => task.list.toString() === list._id.toString());
			return {
				...list.toObject(),
				tasks: listTasks,
			};
		});

		// devolver el proyecto con listas y tareas
		const projectWithListsAndTasks = {
			...project.toObject(),
			lists: listsWithTasks,
		};

		res.json(projectWithListsAndTasks);

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getProjectsByUser = async (req, res) => {
	try {
		const projects = await projectModel.find({ user: req.params.userId });
		res.json(projects);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};



const getFullUserData = async (req, res) => {
	try {

		const userId = req.params.userId.trim();

		const projects = await projectModel.find({ user: userId });

		const projectIds = projects.map((project) => project._id);
		const lists = await listModel.find({ project: { $in: projectIds } });

		const listIds = lists.map((list) => list._id);
		const tasks = await taskModel.find({ list: { $in: listIds } });

		const projectsWithListsAndTasks = projects.map((project) => {
			const projectLists = lists.filter((list) => list.project.toString() === project._id.toString());

			const listsWithTasks = projectLists.map((list) => {
				const listTasks = tasks.filter((task) => task.list.toString() === list._id.toString());
				return {
					...list.toObject(),
					tasks: listTasks,
				};
			});

			return {
				...project.toObject(),
				lists: listsWithTasks,
			};
		});

		res.json(projectsWithListsAndTasks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateProject = async (req, res) => {
	try {
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

const deleteProject = async (req, res) => {
	const projectDeleted = await projectModel.findByIdAndDelete(req.params.id);
	res.json(projectDeleted);
}
export default { getFullUserData, createProject, getProjects, getProjectsByUser, updateProject, deleteProject, getProjectbyId }