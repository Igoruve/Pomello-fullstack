const usersData =[
  {
    "_id": { "$oid": "65f1a1b3c4d2e3f4a5b6c7d8" },
    "email": "maria.rodriguez@example.com",
    "password": "$2a$10$LKJhNOI8oJ5Gy8K9yZ3ZPuqUeaStBpAodnYY0H8ETiXsW9JvBDIMi",
    "createdAt": { "$date": "2024-03-15T08:30:00.000Z" },
    "projects": [
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0e1" },
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0e3" },
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0e5" }
    ]
  },
  {
    "_id": { "$oid": "65f1a1b3c4d2e3f4a5b6c7d9" },
    "email": "carlos.lopez@example.com",
    "password": "$2a$10$PQR9STuvwXyZAbCdEfGHiJklmNOPqrStUvWXYZBnJK1LdOWeRkBSa",
    "createdAt": { "$date": "2024-02-20T14:45:00.000Z" },
    "projects": [
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0e2" },
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0e4" },
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0ec" }
    ]
  },
  {
    "_id": { "$oid": "65f1a1b3c4d2e3f4a5b6c7da" },
    "email": "ana.martinez@example.com",
    "password": "$2a$10$DfGhIJklMnOpQrStUvWXyZAbCdE1LdOWeRkBSaPQR9STuvwXyZAbC",
    "createdAt": { "$date": "2024-04-05T10:20:00.000Z" },
    "projects": [
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0e7" },
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0e9" },
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0eb" }
    ]
  },
  {
    "_id": { "$oid": "65f1a1b3c4d2e3f4a5b6c7db" },
    "email": "pedro.sanchez@example.com",
    "password": "$2a$10$BCdEfGhIJklMnOpQrStUvWXyZAbCdEfGHiJklmNOPqrStUvWXyZA",
    "createdAt": { "$date": "2024-01-30T16:15:00.000Z" },
    "projects": [
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0e6" },
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0e8" },
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0ea" }
    ]
  },
  {
    "_id": { "$oid": "65f1a1b3c4d2e3f4a5b6c7dc" },
    "email": "laura.garcia@example.com",
    "password": "$2a$10$YZAbCdEfGHiJklmNOPqrStUvWXyZAbCdEfGHiJklmNOPqrStUvWX",
    "createdAt": { "$date": "2024-03-25T09:10:00.000Z" },
    "projects": [
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0ed" },
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0ee" },
      { "$oid": "65f2b1c3d4e5f6a7b8c9d0ef" }
    ]
  }
]

export default usersData;