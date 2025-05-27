# Pomello
## Task Manager with Pomodoro Integration

**Pomello** is a full-stack task management application that blends the organizational structure of **Trello** with the productivity rhythm of the **Pomodoro technique**. It implements a dropdown component that enhances user interaction by allowing dynamic selection of task-related options.

## Contributors

- [Igor Aparicio](https://github.com/Igoruve)
- [Daniel Arroyo](https://github.com/darroyo083)
- [Dalila Cabrera](https://github.com/crdalila)
- [Javier Llarena](https://github.com/javierlla)
- [Indira Sierra](https://github.com/IndiraSierra)

---

---

## Features

### Core Functionality

- **Task Boards:** Create projects, lists, and tasks. Drag-and-drop capabilities for smooth workflow management.
- **Pomodoro Timer:** Fully integrated timer with customizable focus and break intervals. Automates the start-stop cycle for deep work sessions.
- **Statistics Tracking:** Backend logic stores usage and session data of the timer for analytics and productivity feedback.
- **Responsive UI:** Built with React and TailwindCSS.

---

## 🚀 Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Frontend      | React + TailwindCSS |
| Backend       | Node.js + Express   |
| Database      | MongoDB + Mongoose  |
| Auth & Tokens | JWT                 |
| Dev Tools     | Vite                |

---

## Project Structure

```bash
Pomello/
├── client/
│   ├── src/
│   │   ├── components/           # Small components
│   │   ├── context/              # Auth context
│   │   ├── data/                 # Example data          
│   │   ├── pages/                # Main components
│   │   ├── styles/               # Custom styles
│   │   ├── utils/
│   │   ├── styles/  
├── server/
│   ├── docs                      # Documentation  
│   ├── src/
│   │   ├── config/               # Mongoose configuration
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/                # Errors, token and bcrypt
│   │   ├── index.js
│   ├── package.json              # Server dependencies
```

---

## Installation

```bash
# Clone repository
git clone https://github.com/Igoruve/Pomello-fullstack.git
cd Pomello-fullstack

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

---

## Usage

### Start the server (backend):
```bash
cd server
docker compose up
```

### Start the client (frontend):
```bash
cd client
npm run dev
```