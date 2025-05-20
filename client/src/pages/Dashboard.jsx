import React, { useState, useEffect } from "react";
import SessionChart from "../components/SessionChart";

const Dashboard = () => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Mockear los datos del backend
    const mockData = 	{
        "totalSessions": 21,
        "completedSessions": 11,
        "interruptedSessions": 10,
        "sessions": [
            {
                "_id": "6825eea63b9ca597bd420e22",
                "focusDuration": 25,
                "breakDuration": 5,
                "chronostarted": "2025-05-15T13:39:50.128Z",
                "chronostopped": "2025-05-15T13:40:06.242Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-15T13:39:50.132Z",
                "__v": 0
            },
            {
                "_id": "6825eecf3b9ca597bd420e28",
                "focusDuration": 25,
                "breakDuration": 5,
                "chronostarted": "2025-05-15T13:40:31.074Z",
                "chronostopped": "2025-05-15T13:41:50.389Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-15T13:40:31.075Z",
                "__v": 0
            },
            {
                "_id": "6825f3673b9ca597bd420e2f",
                "focusDuration": 25,
                "breakDuration": 5,
                "chronostarted": "2025-05-15T14:00:07.926Z",
                "chronostopped": "2025-05-15T14:26:01.434Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-15T14:00:07.927Z",
                "__v": 0
            },
            {
                "_id": "6825f9813fab061e36ac366e",
                "focusDuration": 25,
                "breakDuration": 5,
                "chronostarted": "2025-05-15T14:26:09.950Z",
                "chronostopped": "2025-05-15T14:26:27.344Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-15T14:26:09.951Z",
                "__v": 0
            },
            {
                "_id": "6826340e2fcd4c9ba8e2009c",
                "focusDuration": 25,
                "breakDuration": 5,
                "chronostarted": "2025-05-15T18:35:58.648Z",
                "chronostopped": "2025-05-16T11:46:37.089Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-15T18:35:58.651Z",
                "__v": 0
            },
            {
                "_id": "682b08efd7ff5b1d8aa06fa0",
                "focusDuration": 25,
                "breakDuration": 5,
                "chronostarted": "2025-05-19T10:33:19.500Z",
                "chronostopped": "2025-05-19T10:33:24.323Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-19T10:33:19.503Z",
                "__v": 0
            },
            {
                "_id": "682b0fa86646e91a1c11e5eb",
                "focusDuration": 25,
                "breakDuration": 5,
                "chronostarted": "2025-05-19T11:02:00.155Z",
                "chronostopped": "2025-05-19T11:02:06.125Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-19T11:02:00.160Z",
                "__v": 0
            },
            {
                "_id": "682b0fb36646e91a1c11e5f0",
                "focusDuration": 25,
                "breakDuration": 5,
                "chronostarted": "2025-05-19T11:02:11.558Z",
                "chronostopped": "2025-05-19T11:02:19.134Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-19T11:02:11.558Z",
                "__v": 0
            },
            {
                "_id": "682c4705f39dd55e5e5257aa",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:10:29.562Z",
                "chronostopped": "2025-05-20T09:10:35.517Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-20T09:10:29.565Z",
                "__v": 0
            },
            {
                "_id": "682c4711f39dd55e5e5257af",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:10:41.269Z",
                "chronostopped": "2025-05-20T09:10:50.693Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-20T09:10:41.269Z",
                "__v": 0
            },
            {
                "_id": "682c49762f40ed726183b33d",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:20:54.649Z",
                "chronostopped": "2025-05-20T09:21:01.503Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-20T09:20:54.654Z",
                "__v": 0
            },
            {
                "_id": "682c49ba2f40ed726183b342",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:22:02.730Z",
                "chronostopped": "2025-05-20T09:23:02.741Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:22:02.730Z",
                "__v": 0
            },
            {
                "_id": "682c4a142f40ed726183b347",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:23:32.756Z",
                "chronostopped": "2025-05-20T09:24:32.773Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:23:32.757Z",
                "__v": 0
            },
            {
                "_id": "682c4a6e2f40ed726183b34c",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:25:02.787Z",
                "chronostopped": "2025-05-20T09:26:02.798Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:25:02.789Z",
                "__v": 0
            },
            {
                "_id": "682c4ac82f40ed726183b351",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:26:32.809Z",
                "chronostopped": "2025-05-20T09:27:32.829Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:26:32.810Z",
                "__v": 0
            },
            {
                "_id": "682c4b0b2f40ed726183b356",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:27:39.988Z",
                "chronostopped": "2025-05-20T09:28:04.055Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-20T09:27:39.988Z",
                "__v": 0
            },
            {
                "_id": "682c4d12f69fbf5e3a0f64a2",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:36:18.169Z",
                "chronostopped": "2025-05-20T09:37:18.202Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:36:18.173Z",
                "__v": 0
            },
            {
                "_id": "682c4d6cf69fbf5e3a0f64a7",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:37:48.226Z",
                "chronostopped": "2025-05-20T09:38:48.250Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:37:48.227Z",
                "__v": 0
            },
            {
                "_id": "682c4dc6f69fbf5e3a0f64ac",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:39:18.261Z",
                "chronostopped": "2025-05-20T09:40:18.276Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:39:18.262Z",
                "__v": 0
            },
            {
                "_id": "682c4e20f69fbf5e3a0f64b1",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:40:48.290Z",
                "chronostopped": "2025-05-20T09:41:48.307Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:40:48.292Z",
                "__v": 0
            },
            {
                "_id": "682c4eee8c87b504ddb96c92",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:44:14.247Z",
                "chronostopped": "2025-05-20T09:45:14.276Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:44:14.251Z",
                "__v": 0
            },
            {
                "_id": "682c4f488c87b504ddb96c98",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:45:44.303Z",
                "chronostopped": null,
                "sessionsCompleted": 0,
                "createdAt": "2025-05-20T09:45:44.305Z",
                "__v": 0
            }
        ],
        "totalFocusTime": 1068.493633333333,
        "totalBreakTime": 46.5,
        "totalTime": 1114.993633333333,
        "averageFocusTime": 50.88064920634919,
        "averageBreakTime": 2.2142857142857144,
        "averageTime": 53.094934920634905,
        "averageSessionsCompleted": 0.5238095238095238,
        "averageSessionsInterrupted": 0.47619047619047616,
        "averageSessionsCompletedPercentage": 52.38095238095239,
        "averageSessionsInterruptedPercentage": 47.61904761904761,
        "averageSessionsCompletedTime": 96.86685757575756,
        "averageSessionsInterruptedTime": 0.29582,
        "averageSessionsTime": 50.88064920634919,
        "averageSessionsCompletedTimePercentage": 190.3805456233643,
        "dailySessions": [
            {
                "_id": "682c4705f39dd55e5e5257aa",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:10:29.562Z",
                "chronostopped": "2025-05-20T09:10:35.517Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-20T09:10:29.565Z",
                "__v": 0
            },
            {
                "_id": "682c4711f39dd55e5e5257af",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:10:41.269Z",
                "chronostopped": "2025-05-20T09:10:50.693Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-20T09:10:41.269Z",
                "__v": 0
            },
            {
                "_id": "682c49762f40ed726183b33d",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:20:54.649Z",
                "chronostopped": "2025-05-20T09:21:01.503Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-20T09:20:54.654Z",
                "__v": 0
            },
            {
                "_id": "682c49ba2f40ed726183b342",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:22:02.730Z",
                "chronostopped": "2025-05-20T09:23:02.741Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:22:02.730Z",
                "__v": 0
            },
            {
                "_id": "682c4a142f40ed726183b347",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:23:32.756Z",
                "chronostopped": "2025-05-20T09:24:32.773Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:23:32.757Z",
                "__v": 0
            },
            {
                "_id": "682c4a6e2f40ed726183b34c",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:25:02.787Z",
                "chronostopped": "2025-05-20T09:26:02.798Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:25:02.789Z",
                "__v": 0
            },
            {
                "_id": "682c4ac82f40ed726183b351",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:26:32.809Z",
                "chronostopped": "2025-05-20T09:27:32.829Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:26:32.810Z",
                "__v": 0
            },
            {
                "_id": "682c4b0b2f40ed726183b356",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:27:39.988Z",
                "chronostopped": "2025-05-20T09:28:04.055Z",
                "sessionsCompleted": 0,
                "createdAt": "2025-05-20T09:27:39.988Z",
                "__v": 0
            },
            {
                "_id": "682c4d12f69fbf5e3a0f64a2",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:36:18.169Z",
                "chronostopped": "2025-05-20T09:37:18.202Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:36:18.173Z",
                "__v": 0
            },
            {
                "_id": "682c4d6cf69fbf5e3a0f64a7",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:37:48.226Z",
                "chronostopped": "2025-05-20T09:38:48.250Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:37:48.227Z",
                "__v": 0
            },
            {
                "_id": "682c4dc6f69fbf5e3a0f64ac",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:39:18.261Z",
                "chronostopped": "2025-05-20T09:40:18.276Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:39:18.262Z",
                "__v": 0
            },
            {
                "_id": "682c4e20f69fbf5e3a0f64b1",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:40:48.290Z",
                "chronostopped": "2025-05-20T09:41:48.307Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:40:48.292Z",
                "__v": 0
            },
            {
                "_id": "682c4eee8c87b504ddb96c92",
                "focusDuration": 1,
                "breakDuration": 0.5,
                "chronostarted": "2025-05-20T09:44:14.247Z",
                "chronostopped": "2025-05-20T09:45:14.276Z",
                "sessionsCompleted": 1,
                "createdAt": "2025-05-20T09:44:14.251Z",
                "__v": 0
            }
        ]
    };

    setSessionData(mockData);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {sessionData && <SessionChart data={sessionData} />}
    </div>
  );
};

export default Dashboard;