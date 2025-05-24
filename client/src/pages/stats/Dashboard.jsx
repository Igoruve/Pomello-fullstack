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

  console.log("Estadísticas recibidas:", sessionData);


  return (
    <section className="bg-gray-600 h-full pt-40 pl-80">
      <div className="text-gray-100 text-center flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Your focus stats</h1>
        <p className="text-xl">Here you can see how long have you been focused since you started the chrono.</p>
      </div>
      <div className="flex flex-row justify-between items-center pt-10">
        {sessionData ? (
          <SessionChart data={sessionData} />
        ) : (
          <p>Loading your stats...</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;