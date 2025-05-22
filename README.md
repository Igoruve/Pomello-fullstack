Pomello
📘 PROJECT DESCRIPTION:
FullStack project that combines a Trello clone with functionality to manage time using the Pomodoro technique. On one side, there's a board management system with projects, lists, and tasks. On the other, there's a timer where users can specify a focus time, and based on that, receive a calculated break duration following Pomodoro guidelines. Additionally, Pomello logs user statistics.

📌 Implementation Considerations
Start/Stop Event Tracking: When the user starts or stops the timer, the fields chronostarted and chronostopped must be updated accordingly. This enables calculating the duration of each session and determining whether it was completed or interrupted.

Session Completion Calculation: A session is considered completed if the time between chronostarted and chronostopped is equal to or greater than the specified focusDuration.

Statistics Preparation: Storing this data enables generating statistics such as the number of completed sessions, interrupted sessions, and total focus and break times, which can be visualized through charts on the frontend.

✅ Chronometer Structural Logic
Model: Database schema representing the logical timer structure.

Controller: Implements functions to handle requests such as start, stop, and retrieve timer statistics.

Routes: Defines API routes to interact with the timer, ensuring they are protected by authentication.

Authentication Middleware: Ensures only authenticated users can access and manipulate their own timer data.

Frontend Integration: Builds the user interface to allow starting/stopping the timer and visualizing the collected statistics.





# ⏱️ Pomellodoro Module – Pomello Fullstack

This module handles the logic of the **focus timer** and the **Pomellodoro cycle** in the Pomello app — a productivity platform combining Trello-like task management with the Pomodoro technique.

---

## 📌 Endpoints

### 🔹 `POST /pomellodoro/start`
Starts a full Pomellodoro cycle consisting of 4 alternating focus and break sessions.

**Request Body:**
```json
{
  "focusDuration": 1,
  "breakDuration": 0.5
}
Response:

json
Copy
Edit
{
  "message": "Pomellodoro started"
}
🔹 POST /pomellodoro/stop
Stops the currently running Pomellodoro cycle and clears all scheduled timeouts.

Response:

json
Copy
Edit
{
  "message": "🍊✅ Pomellodoro stopped"
}
🔹 GET /pomellodoro/status
Returns the current status of the Pomellodoro engine.

Response:

json
Copy
Edit
{
  "active": true,
  "timeouts": 2,
  "sessions": 2
}
🔹 GET /stats
Retrieves statistical data from the user's chronometer sessions.

Response:

json
Copy
Edit
{
  "totalSessions": 12,
  "completedSessions": 10,
  "interruptedSessions": 2,
  "totalFocusTime": 240,
  "averageFocusTime": 20,
  "averageBreakTime": 5,
  "averageSessionsCompleted": 2.5,
  ...
}
🚨 Error Handling
All errors are returned using a custom emoji-based syntax for quick understanding and UI integration.

Error format:

json
Copy
Edit
{
  "error": "🍅❌ Chronometer already running"
}
Examples of error responses:
HTTP Code	Error Class	Message
400	InvalidDurationValue	🍅❌ Invalid Duration Values...
400	ChronoAlreadyRunning	🍅❌ Chronometer already running
404	PomellodoroNotRunning	🍅❌ No Pomellodoro cycle currently active
200	PomellodoroStatsEmpty	🍊✅ No sessions found, stats are empty

🧠 Internal Logic Overview
startChrono(userId, focus, break): Begins a chronometer session in the database.

stopChrono(userId): Stops the currently active chronometer session.

Pomellodoro cycle: Executes 4 iterations of startChrono() and stopChrono() with focus/rest delays using setTimeout.

pomellodoroActive: Boolean flag controlling active state of cycle (in-memory only).

pomellodoroTimeouts: Array of running timeout IDs to allow cycle interruption.

⚠️ Note: This logic is in-memory only and resets on server restart.

🌱 To-Do / Improvements
 Store Pomellodoro state in DB to persist between restarts.

 Real-time status push to frontend via WebSocket.

 UI animations/sounds on cycle transitions.

📁 Folder Structure
bash
Copy
Edit
/src
  └── /controllers
       └── chronoController.js
  └── /models
       └── chrono.js
  └── /utils
       └── errors.js
🧾 License
MIT © Igoruve

yaml
Copy
Edit

---

markdown
Copy
Edit
# ⏱️ Pomellodoro Module – Pomello Fullstack

This module manages the focus timer logic and the Pomellodoro productivity cycle within the Pomello fullstack application. Pomello is a Trello-like task manager enhanced with Pomodoro-based session tracking.

---

## 📌 API Endpoints

### 🔹 `POST /pomellodoro/start`
Starts a full Pomellodoro cycle with 4 alternating focus and break periods.

#### Request Body:
```json
{
  "focusDuration": 1,
  "breakDuration": 0.5
}
Response:
json
Copy
Edit
{
  "message": "Pomellodoro started"
}
🔹 POST /pomellodoro/stop
Stops the currently active Pomellodoro cycle and clears any remaining timeouts.

Response:
json
Copy
Edit
{
  "message": "🍊✅ Pomellodoro stopped"
}
🔹 GET /pomellodoro/status
Returns the current in-memory state of the Pomellodoro engine.

Response:
json
Copy
Edit
{
  "active": true,
  "timeouts": 2,
  "sessions": 2
}
🔹 GET /stats
Returns historical and daily chronometer usage statistics.

Response:
json
Copy
Edit
{
  "totalSessions": 12,
  "completedSessions": 10,
  "interruptedSessions": 2,
  "totalFocusTime": 240,
  "averageFocusTime": 20,
  "averageBreakTime": 5,
  "averageSessionsCompleted": 2.5,
  "averageSessionsCompletedPercentage": 83.3,
  ...
}
⚙️ Internal Logic Summary
startChrono(userId, focusDuration, breakDuration)
Creates a new active chrono session and saves it in MongoDB. Throws error if an active session already exists.

stopChrono(userId)
Marks the most recent active session as stopped and updates completion count if the session met the full focus duration.

getChronoStats(req, res)
Aggregates all chrono session data for the current user into meaningful statistics for frontend graphing.

startPomellodoroCycle(req, res)
Launches a chained timer loop (4 cycles) with delays managed via setTimeout. Each cycle creates a focus session followed by a break.

stopPomellodoroCycle(req, res)
Clears all timers and stops the active Pomellodoro. Ends any ongoing chrono session.

getPomellodoroStatus(req, res)
Returns current values of:

pomellodoroActive

pomellodoroTimeouts.length

active sessions in queue

🍅 Custom Error Messages
All errors follow a consistent emoji-enhanced format:

HTTP Code	Class	Message Example
400	InvalidDurationValue	🍅❌ Invalid Duration Values...
400	ChronoAlreadyRunning	🍅❌ Chronometer already running
404	PomellodoroNotRunning	🍅❌ No Pomellodoro cycle currently running
200	PomellodoroStatsEmpty	🍊✅ No sessions found, stats are empty

This style is designed to be visually intuitive and suitable for UI rendering.

🧠 Design Considerations
All cycle status is kept in memory (pomellodoroActive, pomellodoroTimeouts[])

Each Pomellodoro cycle creates up to 4 database-backed chrono sessions.

Uses MongoDB to persist session data.

All timeouts are cancelled on manual stop or server restart.

Chrono sessions are used both independently and within Pomellodoro mode.

📁 Directory Structure
bash
Copy
Edit
/server
  ├── /src
  │   ├── /controllers
  │   │   └── chronoController.js
  │   ├── /models
  │   │   └── chrono.js
  │   ├── /utils
  │   │   └── errors.js
  ├── jsdoc.json
  └── README.md
📚 Developer Notes
This module is documented with JSDoc, and output can be generated using:

bash
Copy
Edit
npx jsdoc -c jsdoc.json
Documentation is output to /server/docs/.

You can customize emoji messages or style them in the frontend using background color mappings:

🍊✅ → #FFA500 (positive)

🍅❌ → #FF4C4C (error)

