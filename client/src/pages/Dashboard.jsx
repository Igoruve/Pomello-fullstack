import React, { useState, useEffect } from "react";
import SessionChart from "../components/SessionChart";
import { getChronoStats } from "../utils/chrono.js";

const Dashboard = () => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const data = await getChronoStats();
        if (data.error) {
          throw new Error(data.message || "Error fetching chrono stats");
        }
        setSessionData(data);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSessionData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {sessionData ? (
        <SessionChart data={sessionData} />
      ) : (
        <p>Loading session data...</p>
      )}
    </div>
  );
};

export default Dashboard;