import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const SessionChart = ({ data }) => {
  const doughnutChartRef = useRef(null);
  const barChartRef = useRef(null);
  const weeklyChartRef = useRef(null);

  useEffect(() => {
  const sessions = data?.sessions ?? [];
  const completedSessions = data?.completedSessions ?? 0;
  const interruptedSessions = data?.interruptedSessions ?? 0;

  // Doughnut Chart
  const doughnutCtx = doughnutChartRef.current.getContext("2d");
  if (doughnutChartRef.current.chartInstance) {
    doughnutChartRef.current.chartInstance.destroy();
  }
  doughnutChartRef.current.chartInstance = new Chart(doughnutCtx, {
    type: "pie",
    data: {
      labels: ["Completed", "Interrupted"],
      datasets: [
        {
          label: "Sessions",
          data: [completedSessions, interruptedSessions],
          backgroundColor: ["#4CAF50", "#F44336"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
      },
    },
  });

  // Bar Chart
  const barCtx = barChartRef.current.getContext("2d");
  if (barChartRef.current.chartInstance) {
    barChartRef.current.chartInstance.destroy();
  }
  const sessionLabels = sessions.map((_, i) => `Session ${i + 1}`);
  const focusDurations = sessions.map((s) => s.focusDuration ?? 0);
  const breakDurations = sessions.map((s) => s.breakDuration ?? 0);

  barChartRef.current.chartInstance = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: sessionLabels.length > 0 ? sessionLabels : ["No Sessions"],
      datasets: [
        {
          label: "Focus Duration (min)",
          data: focusDurations.length > 0 ? focusDurations : [0],
          backgroundColor: "#4CAF50",
        },
        {
          label: "Break Duration (min)",
          data: breakDurations.length > 0 ? breakDurations : [0],
          backgroundColor: "#F44336",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
      },
      scales: {
        x: { title: { display: true, text: "Sessions" } },
        y: {
          beginAtZero: true,
          title: { display: true, text: "Duration (minutes)" },
        },
      },
    },
  });

  // Weekly Chart
  const weeklyCtx = weeklyChartRef.current.getContext("2d");
  if (weeklyChartRef.current.chartInstance) {
    weeklyChartRef.current.chartInstance.destroy();
  }

  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const weeklyData = Array(7).fill(0);

  sessions.forEach((session) => {
    const date = new Date(session.createdAt);
    if (date >= startOfWeek && date <= endOfWeek) {
      const day = (date.getDay() + 6) % 7; // Monday = 0
      weeklyData[day]++;
    }
  });

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
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
      },
      scales: {
        x: { title: { display: true, text: "Day of the Week" } },
        y: {
          beginAtZero: true,
          title: { display: true, text: "Number of Sessions" },
        },
      },
    },
  });
}, [data]);


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "350px" }}>
        <div style={{ width: "350px", height: "350px" }}>
          <canvas ref={doughnutChartRef} style={{ width: "100%", height: "100%" }}></canvas>
        </div>
      </div>
      <canvas ref={barChartRef} style={{ marginTop: "20px" }}></canvas>
      <canvas ref={weeklyChartRef} style={{ marginTop: "20px" }}></canvas>
    </div>
  );
};

export default SessionChart;
