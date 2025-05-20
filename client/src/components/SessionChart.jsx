import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const SessionChart = ({ data }) => {
  const doughnutChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    if (!data) return;

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
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
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
            backgroundColor: "#4CAF50",
          },
          {
            label: "Break Duration (min)",
            data: breakDurations,
            backgroundColor: "#F44336",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Sessions",
            },
          },
          y: {
            title: {
              display: true,
              text: "Duration (minutes)",
            },
            beginAtZero: true,
          },
        },
      },
    });
  }, [data]);

  return (
    <div>
      <canvas ref={doughnutChartRef}></canvas>
      <canvas ref={barChartRef} style={{ marginTop: "20px" }}></canvas>
    </div>
  );
};

export default SessionChart;