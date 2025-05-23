import PomodoroTimer from "../../components/PomodoroTimer";


export default function PomodoroPage() {
  console.log("PomodoroPage rendering"); 
  
  return (
    <div style={{ 
      padding: "2rem",
      border: "1px solid #ccc", 
      borderRadius: "8px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <h1 style={{ color: "#e74c3c" }}>Temporizador Pomodoro</h1>
      <div style={{ 
        backgroundColor: "#f9f9f9", 
        padding: "1rem",
        borderRadius: "4px"
      }}>
        <PomodoroTimer />
      </div>
    </div>
  );
}