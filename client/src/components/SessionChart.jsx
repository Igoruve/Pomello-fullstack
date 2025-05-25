import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const SessionChart = ({ data }) => {
  const doughnutChartRef = useRef(null);
  const barChartRef = useRef(null);
  const weeklyChartRef = useRef(null);

  // Verificar si los datos están vacíos o no tienen estadísticas
  if (!data || data.totalSessions === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
        <h2 className="text-2xl font-bold mb-4">No Statistics Available</h2>
        <p className="text-lg">
          You don't have any statistics yet. Start a session to see your stats here!
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (!data) return;

    console.log("Weekly Chart Data:", data.sessions);

    // Doughnut Chart
    const doughnutCtx = doughnutChartRef.current.getContext("2d");
    if (doughnutChartRef.current.chartInstance) {
      doughnutChartRef.current.chartInstance.destroy();
    }
    doughnutChartRef.current.chartInstance = new Chart(doughnutCtx, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Interrupted"],
        datasets: [
          {
            label: "Sessions",
            data: [data.completedSessions, data.interruptedSessions],
            backgroundColor: ["#4CAF50", "#F44336"],
            hoverBackgroundColor: ["#66BB6A", "#EF5350"],
            borderWidth: 2,
            hoverBorderWidth: 3,
            borderColor: "#ffffff",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#ffffff",
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = tooltipItem.raw;
                return `${tooltipItem.label}: ${value} sessions`;
              },
            },
          },
        },
      },
    });

    // Bar Chart
    const barCtx = barChartRef.current.getContext("2d");
    if (barChartRef.current.chartInstance) {
      barChartRef.current.chartInstance.destroy();
    }
    const sessionLabels = data.sessions.map((session, index) => `Session ${index + 1}`);
    const focusDurations = data.sessions.map((session) => session.focusDuration);
    const breakDurations = data.sessions.map((session) => session.breakDuration);

    barChartRef.current.chartInstance = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: sessionLabels,
        datasets: [
          {
            label: "Focus Duration (min)",
            data: focusDurations,
            backgroundColor: "rgba(76, 175, 80, 0.8)",
            hoverBackgroundColor: "rgba(76, 175, 80, 1)",
          },
          {
            label: "Break Duration (min)",
            data: breakDurations,
            backgroundColor: "rgba(244, 67, 54, 0.8)",
            hoverBackgroundColor: "rgba(244, 67, 54, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#ffffff",
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw} min`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Sessions",
              color: "#ffffff",
              font: {
                size: 16,
              },
            },
            ticks: {
              color: "#ffffff",
            },
          },
          y: {
            title: {
              display: true,
              text: "Duration (minutes)",
              color: "#ffffff",
              font: {
                size: 16,
              },
            },
            ticks: {
              color: "#ffffff",
            },
            beginAtZero: true,
          },
        },
        animation: {
          duration: 1000,
          easing: "easeOutBounce",
        },
      },
    });

    // Weekly Chart
    const weeklyCtx = weeklyChartRef.current.getContext("2d");

    // Destruir el gráfico existente si ya está creado
    if (weeklyChartRef.current.chartInstance) {
      weeklyChartRef.current.chartInstance.destroy();
    }

    // Obtener el inicio y fin de la semana actual (lunes a domingo)
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (domingo) a 6 (sábado)

    // Ajustar para que la semana comience el lunes y termine el domingo
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Si es domingo, retrocede 6 días
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Avanzar 6 días desde el lunes
    endOfWeek.setHours(23, 59, 59, 999);

    console.log("Start of Week:", startOfWeek);
    console.log("End of Week:", endOfWeek);
    console.log("Session Dates:", data.sessions.map((s) => s.chronostarted));

    // Filtrar sesiones de la semana actual
    const currentWeekSessions = data.sessions.filter((session) => {
      const sessionDate = new Date(session.chronostarted);
      return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
    });

    // Agrupar sesiones por día de la semana (lunes a domingo)
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const weeklyData = Array(7).fill(0); // Inicializar array para 7 días

    currentWeekSessions.forEach((session) => {
      const day = (new Date(session.createdAt).getDay() + 6) % 7; // Ajustar día para empezar en lunes
      weeklyData[day] += 1; // Incrementar el conteo de sesiones para el día
    });

    // Crear el gráfico
    weeklyChartRef.current.chartInstance = new Chart(weeklyCtx, {
      type: "line",
      data: {
        labels: daysOfWeek,
        datasets: [
          {
            label: "Sessions per Day",
            data: weeklyData,
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#4CAF50",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#ffffff",
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return `${tooltipItem.label}: ${tooltipItem.raw} sessions`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Day of the Week",
              color: "#ffffff",
              font: {
                size: 16,
              },
            },
            ticks: {
              color: "#ffffff",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Sessions",
              color: "#ffffff",
              font: {
                size: 16,
              },
            },
            ticks: {
              color: "#ffffff",
            },
            beginAtZero: true,
          },
        },
        animation: {
          duration: 1500,
          easing: "easeInOutQuart",
        },
      },
    });
  }, [data]);

  return (
    <div className="bg-gray-800 min-h-screen ml-64 mt-10 px-4 py-6"> {/* Añadir margen izquierdo */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "300px", // Ajustar altura
          marginBottom: "70px", // Espacio entre gráficos
        }}
      >
        <div style={{ width: "300px", height: "300px" }}> {/* Ajustar tamaño */}
          <canvas ref={doughnutChartRef} style={{ width: "100%", height: "100%" }}></canvas>
        </div>
      </div>
      <div
        style={{
          marginBottom: "70px", // Espacio entre gráficos
        }}
      >
        <canvas ref={barChartRef} style={{ width: "100%", maxHeight: "300px" }}></canvas> {/* Ajustar altura */}
      </div>
      <div
        style={{
          marginBottom: "20px", // Espacio entre gráficos
        }}
      >
        <canvas ref={weeklyChartRef} style={{ width: "100%", maxHeight: "400px" }}></canvas> {/* Hacer más grande */}
      </div>
    </div>
  );
};

export default SessionChart;