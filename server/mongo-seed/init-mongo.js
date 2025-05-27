db = db.getSiblingDB('pomello');

const userId = ObjectId();

db.users.insertOne({
  _id: userId,
  email: "demo@gmail.com",
  password: "$2a$10$HMmeDskgJjMXdRka9aAd2O54GPMWcXTxPZeANHcCibuf8Rbpxk78q", // Nota: En entorno real, debe ir hasheada
  createdAt: new Date()
});

const projectId = ObjectId();
db.projects.insertOne({
  _id: projectId,
  title: "Pomello Demo Project",
  description: "Sample project with lists and tasks",
  createdAt: new Date(),
  isFavorite: false,
  user: userId
});

const lists = [
  { _id: ObjectId(), title: "To Do", position: 0 },
  { _id: ObjectId(), title: "In Progress", position: 1 },
  { _id: ObjectId(), title: "Done", position: 2 },
];

lists.forEach(list => {
  db.lists.insertOne({
    ...list,
    createdAt: new Date(),
    isCompleted: false,
    project: projectId
  });
});

const tasks = [
  {
    title: "Drag and Drop UI",
    list: lists[0]._id,
    position: 0,
  },
  {
    title: "Connect Backend",
    list: lists[1]._id,
    position: 0,
  },
  {
    title: "Fix Styling",
    list: lists[2]._id,
    position: 0,
  }
];

tasks.forEach(task => {
  db.tasks.insertOne({
    ...task,
    description: "",
    createdAt: new Date(),
    isCompleted: false
  });
});
