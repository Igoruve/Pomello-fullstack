import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const SessionChart = ({ data }) => {
  const doughnutChartRef = useRef(null);
  const barChartRef = useRef(null);
  const weeklyChartRef = useRef(null);

  useEffect(() => {
    if (!data) return;

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

    // Weekly Chart
    const weeklyCtx = weeklyChartRef.current.getContext("2d");
    if (weeklyChartRef.current.chartInstance) {
      weeklyChartRef.current.chartInstance.destroy();
    }

    // Get the start and end of the current week (Monday to Sunday)
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Set to Monday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Sunday
    endOfWeek.setHours(23, 59, 59, 999);

    // Filter sessions for the current week
    const currentWeekSessions = data.sessions.filter((session) => {
      const sessionDate = new Date(session.createdAt);
      return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
    });

    // Group sessions by day of the week (Monday to Sunday)
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const weeklyData = Array(7).fill(0); // Initialize array for 7 days

    currentWeekSessions.forEach((session) => {
      const day = (new Date(session.createdAt).getDay() + 6) % 7; // Adjust day to start from Monday (0 = Monday, 6 = Sunday)
      weeklyData[day] += 1; // Increment session count for the day
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
          legend: {
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Day of the Week",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Sessions",
            },
            beginAtZero: true,
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