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

    // Destroy old charts
    const destroyIfExists = (ref) => {
      if (ref.current?.chartInstance) {
        ref.current.chartInstance.destroy();
      }
    };

    destroyIfExists(doughnutChartRef);
    destroyIfExists(barChartRef);
    destroyIfExists(weeklyChartRef);

    // Doughnut Chart
    const doughnutCtx = doughnutChartRef.current.getContext("2d");
    doughnutChartRef.current.chartInstance = new Chart(doughnutCtx, {
      type: "pie",
      data: {
        labels: ["Completed", "Interrupted"],
        datasets: [
          {
            label: "Sessions",
            data: [completedSessions, interruptedSessions],
            backgroundColor: ["#ff6384", "gray"],
            borderColor: ["#ff6384", "gray"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: { color: "white", font: { size: 14 } },
          },
        },
      },
    });

    // Bar Chart
    const barCtx = barChartRef.current.getContext("2d");
    const sessionLabels = sessions.map((_, i) => `Session ${i + 1}`);
    const focusDurations = sessions.map((s) => s.focusDuration ?? 0);
    const breakDurations = sessions.map((s) => s.breakDuration ?? 0);

    barChartRef.current.chartInstance = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: sessionLabels.length ? sessionLabels : ["No stats yet"],
        datasets: [
          {
            label: "Focus Duration",
            data: focusDurations.length ? focusDurations : [0],
            backgroundColor: "#ff6384",
          },
          {
            label: "Break Duration",
            data: breakDurations.length ? breakDurations : [0],
            backgroundColor: "gray",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: { color: "white", font: { size: 14 } },
          },
        },
        scales: {
          x: {
            title: { display: true, text: "Focus sessions", color: "white", font: { size: 14 } },
            ticks: { color: "white" },
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Duration (min)", color: "white", font: { size: 14 } },
            ticks: { color: "white" },
          },
        },
      },
    });

    // Weekly Chart
    const weeklyCtx = weeklyChartRef.current.getContext("2d");
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
        const day = (date.getDay() + 6) % 7;
        weeklyData[day]++;
      }
    });

    weeklyChartRef.current.chartInstance = new Chart(weeklyCtx, {
      type: "line",
      data: {
        labels: daysOfWeek,
        datasets: [
          {
            label: "Focus per day",
            data: weeklyData,
            backgroundColor: "#ff6384",
            borderColor: "ff6384",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: { color: "white" }, font: { size: 14 },
          },
        },
        scales: {
          x: {
            title: { display: true, text: "Day of the Week", color: "white", font: { size: 14 } },
            ticks: { color: "white" },
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Number of Sessions", color: "white", font: { size: 14 } },
            ticks: { color: "white" },
          },
        },
      },
    });
  }, [data]);
  
  return (
    <section className="p-4">
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="bg-gray-500 rounded shadow p-4 w-full md:w-[40%] h-[300px] flex items-center justify-center">
          <canvas ref={doughnutChartRef} width={400} height={300}></canvas>
        </div>

        <div className="bg-gray-500 rounded shadow p-4 w-full md:w-[40%] h-[300px] flex items-center justify-center">
          <canvas ref={barChartRef} width={400} height={300}></canvas>
        </div>

        <div className="bg-gray-500 rounded shadow p-4 w-full md:w-[50%] h-[300px] flex items-center justify-center">
          <canvas ref={weeklyChartRef} width={400} height={300}></canvas>
        </div>
      </div>
    </section>
  );
};

export default SessionChart;
