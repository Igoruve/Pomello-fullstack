const listsData=[
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0f1" },
    "title": "Por hacer",
    "description": "Tareas pendientes por iniciar",
    "createdAt": { "$date": "2024-04-10T09:20:00.000Z" },
    "position": 0,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e1" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1a2" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0f2" },
    "title": "En progreso",
    "description": "Tareas actualmente en desarrollo",
    "createdAt": { "$date": "2024-04-10T09:25:00.000Z" },
    "position": 1,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e1" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1a9" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0f3" },
    "title": "Revisión",
    "description": "Tareas que necesitan ser revisadas",
    "createdAt": { "$date": "2024-04-10T09:30:00.000Z" },
    "position": 2,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e1" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1b0" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0f4" },
    "title": "Completado",
    "description": "Tareas finalizadas",
    "createdAt": { "$date": "2024-04-10T09:35:00.000Z" },
    "position": 3,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e1" },
    "isCompleted": true,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1b7" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0f5" },
    "title": "Backlog",
    "description": "Lista de funcionalidades pendientes",
    "createdAt": { "$date": "2024-03-05T14:35:00.000Z" },
    "position": 0,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e2" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1be" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0f6" },
    "title": "Sprint actual",
    "description": "Tareas del sprint en curso",
    "createdAt": { "$date": "2024-03-05T14:40:00.000Z" },
    "position": 1,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e2" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1c5" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0f7" },
    "title": "QA Testing",
    "description": "Pruebas de calidad",
    "createdAt": { "$date": "2024-03-05T14:45:00.000Z" },
    "position": 2,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e2" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1cc" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0f8" },
    "title": "Lanzamiento",
    "description": "Preparación para el lanzamiento",
    "createdAt": { "$date": "2024-03-05T14:50:00.000Z" },
    "position": 3,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e2" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1d3" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0f9" },
    "title": "Planificación",
    "description": "Fase de planificación del proyecto",
    "createdAt": { "$date": "2024-02-20T11:50:00.000Z" },
    "position": 0,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e3" },
    "isCompleted": true,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1da" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0fa" },
    "title": "Diseño",
    "description": "Fase de diseño de la solución",
    "createdAt": { "$date": "2024-02-20T11:55:00.000Z" },
    "position": 1,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e3" },
    "isCompleted": true,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1e1" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0fb" },
    "title": "Desarrollo",
    "description": "Fase de desarrollo del sistema",
    "createdAt": { "$date": "2024-02-20T12:00:00.000Z" },
    "position": 2,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e3" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1e8" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0fc" },
    "title": "Implementación",
    "description": "Fase de implementación del sistema",
    "createdAt": { "$date": "2024-02-20T12:05:00.000Z" },
    "position": 3,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e3" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1ef" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0fd" },
    "title": "Investigación",
    "description": "Investigación de mercado",
    "createdAt": { "$date": "2024-04-02T10:05:00.000Z" },
    "position": 0,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e4" },
    "isCompleted": true,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1f6" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0fe" },
    "title": "Estrategia",
    "description": "Definición de la estrategia de campaña",
    "createdAt": { "$date": "2024-04-02T10:10:00.000Z" },
    "position": 1,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e4" },
    "isCompleted": true,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f1fd" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e0ff" },
    "title": "Contenido",
    "description": "Creación de contenido para la campaña",
    "createdAt": { "$date": "2024-04-02T10:15:00.000Z" },
    "position": 2,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e4" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f204" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e100" },
    "title": "Lanzamiento",
    "description": "Lanzamiento de la campaña",
    "createdAt": { "$date": "2024-04-02T10:20:00.000Z" },
    "position": 3,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e4" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f20b" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e101" },
    "title": "Análisis",
    "description": "Análisis de la estructura actual",
    "createdAt": { "$date": "2024-03-15T16:25:00.000Z" },
    "position": 0,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e5" },
    "isCompleted": true,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f212" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e102" },
    "title": "Planificación",
    "description": "Planificación de la migración",
    "createdAt": { "$date": "2024-03-15T16:30:00.000Z" },
    "position": 1,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e5" },
    "isCompleted": true,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f219" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e103" },
    "title": "Pruebas",
    "description": "Entorno de pruebas de migración",
    "createdAt": { "$date": "2024-03-15T16:35:00.000Z" },
    "position": 2,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e5" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f220" }]
  },
  {
    "_id": { "$oid": "65f3c2d3e4f5a6b7c8d9e104" },
    "title": "Migración",
    "description": "Ejecución de la migración",
    "createdAt": { "$date": "2024-03-15T16:40:00.000Z" },
    "position": 3,
    "project": { "$oid": "65f2b1c3d4e5f6a7b8c9d0e5" },
    "isCompleted": false,
    "tasks": [{ "$oid": "65f4d3e4f5a6b7c8d9e0f227" }]
  }
]

export default listsData;