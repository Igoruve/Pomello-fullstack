import React, { useState, useEffect } from "react";

import SessionChart from "../../components/charts/SessionChart.jsx";
import { getChronoStats } from "../../utils/chrono.js";

const Dashboard = () => {
  const [sessionData, setSessionData] = useState(null);

useEffect(() => {
  const fetchSessionData = async () => {
    try {
      const stats = await getChronoStats();

      if (stats.error || !stats.data || stats.data.length === 0) {
        console.log("No stats available for this user.");
        setSessionData({ data: [] });  // Puedes pasar un array vacío o estructura vacía
      } else {
        console.log('Respuesta del backend:', stats);
        setSessionData(stats);
      }

    } catch (error) {
      console.error("Error fetching session data:", error);
      setSessionData({ data: [] }); // Maneja el caso de error y establece datos vacíos
    }
  };

  fetchSessionData();
}, []);


if (sessionData === null) {
  return <div>Error al cargar estadísticas del cronómetro.</div>;
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