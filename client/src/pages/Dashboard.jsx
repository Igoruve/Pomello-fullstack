import React, { useState, useEffect } from "react";
import SessionChart from "../components/SessionChart";
import { getChronoStats } from "../utils/chrono.js";

/**
 * Dashboard is a React component that displays the user's session statistics.
 * It fetches session data from the server asynchronously and manages loading
 * and error states. If data is successfully retrieved, it renders the SessionChart
 * component with the session data. If there's an error or no data, it displays
 * an appropriate message to the user.
 *
 * @component
 * @returns {JSX.Element} The rendered dashboard UI.
 */

const Dashboard = () => {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError("You don't have any statistics yet. Start a session to see your stats here!");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center bg-gray-800 justify-center min-h-screen text-white">
        <h2 className="text-2xl font-bold mb-4">No Statistics Available</h2>
        <p className="text-lg">{error}</p>
      </div>
    );
  }

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