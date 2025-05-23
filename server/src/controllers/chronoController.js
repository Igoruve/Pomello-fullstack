import Chrono from '../models/chrono.js';
import Errors from "../utils/errors.js";

const {
  InvalidDurationValue,
  ChronoAlreadyRunning,
  ActiveChronoNotFound,
  ChronoStatsError,
  PomellodoroStatsEmpty,
  PomellodoroAlreadyRunning,
  PomellodoroNotRunning,
  PomellodoroStopError,
  PomellodoroStatusError,
  pomellodoroStopError,
  pomellodoroStatusError,
} = Errors;

// Start a new chrono session
const startChrono = async (userId, focusDurationValue, breakDurationValue) => {
  const focusDuration = Number(focusDurationValue);
  const breakDuration = Number(breakDurationValue);

  if (isNaN(focusDuration) || isNaN(breakDuration) || focusDuration <= 0 || breakDuration <= 0) {
    throw new InvalidDurationValue();
  }

  const existingSession = await Chrono.findOne({ userId, chronostopped: null });

  if (existingSession) {
    throw new ChronoAlreadyRunning();
  }

  const newSession = new Chrono({
    userId,
    focusDuration,
    breakDuration,
    chronostarted: new Date(),
    chronostopped: null,
    sessionsCompleted: 0,
  });

  await newSession.save();
  return newSession;
};

// Stop the chronometer session
const stopChrono = async (userId) => {
  const activeSession = await Chrono.findOne({ userId, chronostopped: null }).sort({ createdAt: -1 });

  if (!activeSession) throw new ActiveChronoNotFound();

  activeSession.chronostopped = new Date();
  const elapsedMinutes = (activeSession.chronostopped - activeSession.chronostarted) / 60000;

  if (elapsedMinutes >= activeSession.focusDuration) {
    activeSession.sessionsCompleted += 1;
  }

  await activeSession.save();
  return activeSession;
};

// Get statistics of the chronometer sessions
const getChronoStats = async (req, res) => {
  try {
<<<<<<< HEAD
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: no user found in request" });
    }

=======
    console.log( req.user.id)
>>>>>>> client/feature/fetch-chart-data
    const sessions = await Chrono.find({ userId: req.user.id });
    console.log( "Click a stats: \n",req.user.id)

    if (!sessions.length) {
      return res.status(404).json({ error: "No Pomellodoro sessions found" });
    }

    const today = new Date();

    const stats = sessions.reduce((acc, session) => {
      const { chronostarted, chronostopped, breakDuration = 0, sessionsCompleted = 0 } = session;

      if (!chronostarted || !chronostopped) return acc;

      const focusTime = (new Date(chronostopped) - new Date(chronostarted)) / 60000;

      acc.totalSessions += 1;
      acc.totalFocusTime += focusTime;
      acc.totalBreakTime += breakDuration;
      acc.totalSessionsCompleted += sessionsCompleted;

      if (sessionsCompleted > 0) {
        acc.completedSessions += 1;
        acc.totalCompletedFocusTime += focusTime;
      } else {
        acc.interruptedSessions += 1;
        acc.totalInterruptedFocusTime += focusTime;
      }

      const sessionDate = new Date(chronostarted);
      if (
        sessionDate.getDate() === today.getDate() &&
        sessionDate.getMonth() === today.getMonth() &&
        sessionDate.getFullYear() === today.getFullYear()
      ) {
        acc.dailySessions.push(session);
      }

      return acc;
    }, {
      totalSessions: 0,
      completedSessions: 0,
      interruptedSessions: 0,
      totalFocusTime: 0,
      totalBreakTime: 0,
      totalSessionsCompleted: 0,
      totalCompletedFocusTime: 0,
      totalInterruptedFocusTime: 0,
      dailySessions: []
    });

    const {
      totalSessions,
      completedSessions,
      interruptedSessions,
      totalFocusTime,
      totalBreakTime,
      totalSessionsCompleted,
      totalCompletedFocusTime,
      totalInterruptedFocusTime,
      dailySessions
    } = stats;

    const safeDiv = (num, den) => den ? num / den : 0;

    const totalTime = totalFocusTime + totalBreakTime;
    const averageFocusTime = safeDiv(totalFocusTime, totalSessions);
    const averageBreakTime = safeDiv(totalBreakTime, totalSessions);
    const averageTime = safeDiv(totalTime, totalSessions);
    const averageSessionsCompleted = safeDiv(totalSessionsCompleted, totalSessions);
    const averageSessionsInterrupted = safeDiv(interruptedSessions, totalSessions);
    const averageSessionsCompletedPercentage = safeDiv(completedSessions * 100, totalSessions);
    const averageSessionsInterruptedPercentage = safeDiv(interruptedSessions * 100, totalSessions);
    const averageSessionsCompletedTime = safeDiv(totalCompletedFocusTime, completedSessions);
    const averageSessionsInterruptedTime = safeDiv(totalInterruptedFocusTime, interruptedSessions);
    const averageSessionsTime = safeDiv(totalFocusTime, totalSessions);
    const averageSessionsCompletedTimePercentage = safeDiv(averageSessionsCompletedTime * 100, averageSessionsTime);

    res.status(200).json({
      totalSessions,
      completedSessions,
      interruptedSessions,
      sessions,
      totalFocusTime,
      totalBreakTime,
      totalTime,
      averageFocusTime,
      averageBreakTime,
      averageTime,
      averageSessionsCompleted,
      averageSessionsInterrupted,
      averageSessionsCompletedPercentage,
      averageSessionsInterruptedPercentage,
      averageSessionsCompletedTime,
      averageSessionsInterruptedTime,
      averageSessionsTime,
      averageSessionsCompletedTimePercentage,
      dailySessions
    });

  } catch (error) {
<<<<<<< HEAD
    console.error("Error in getChronoStats:", error);
    res.status(500).json({ error: "Error getting Pomellodoro stats" });
=======
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }
     res.status(500).json({ error: new ChronoStatsError().message });
>>>>>>> client/feature/fetch-chart-data
  }
  console.log( "Click a stats: \n",req.user.id)
  
};


// Pomellodoro cycle control
let pomellodoroActive = false;
let pomellodoroTimeouts = [];

const startPomellodoroCycle = async (req, res) => {
  try {
    const { focusDuration, breakDuration } = req.body;

    // Validar tipos y que sean números válidos
    if (
      typeof focusDuration !== "number" ||
      typeof breakDuration !== "number" ||
      isNaN(focusDuration) ||
      isNaN(breakDuration) ||
      focusDuration <= 0 ||
      breakDuration <= 0
    ) {
      return res.status(400).json({ message: "Duraciones inválidas. Deben ser números mayores que 0." });
    }

    // Simular almacenamiento en memoria temporal para este ejemplo
    req.app.locals.pomodoroStatus = {
      running: true,
      startTime: Date.now(),
      focusDuration,
      breakDuration,
      userId: req.user._id,
    };

    res.json({ message: "Pomodoro iniciado", status: req.app.locals.pomodoroStatus });
  } catch (err) {
    console.error("Error iniciando Pomodoro:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


const stopPomellodoroCycle = async (req, res) => {
  const userId = req.user.id;

  try {
    if (!pomellodoroActive) throw new PomellodoroNotRunning();

    pomellodoroTimeouts.forEach(clearTimeout);
    pomellodoroTimeouts = [];
    pomellodoroActive = false;

    try {
      await stopChrono(userId);
    } catch (e) {
      console.warn('🍊✅ No active chrono to stop or already stopped');
    }

    res.status(200).json({ message: "🍊✅ Pomellodoro stopped" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || new PomellodoroStopError().message });
  }
};

const getPomellodoroStatus = (req, res) => {
  try {
    const status = {
      active: pomellodoroActive,
      timeouts: pomellodoroTimeouts.length,
      sessions: pomellodoroTimeouts.filter(timeout => timeout !== null).length,
    };
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: new PomellodoroStatusError().message });
  }
};

export default {
  startChrono,
  stopChrono,
  getChronoStats,
  startPomellodoroCycle,
  stopPomellodoroCycle,
  getPomellodoroStatus
};


