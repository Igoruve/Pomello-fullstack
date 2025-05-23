import Chrono from '../models/chrono.js';
import Errors from "../utils/errors.js"; // ✅ Importación correcta
import mongoose from "mongoose";
// Start a new chrono session
/**
 * Starts a new chronometer session for a user.
 *
 * Validates focus and break durations. If a session is already active, it throws an error.
 *
 * @param {string} userId - The ID of the user starting the session.
 * @param {number|string} focusDurationValue - The focus duration in minutes.
 * @param {number|string} breakDurationValue - The break duration in minutes.
 * @returns {Promise<Object>} The created chrono session.
 * @throws {InvalidDurationValue} If durations are invalid.
 * @throws {ChronoAlreadyRunning} If a session is already active.
 */

const startChrono = async (userId, focusDurationValue, breakDurationValue) => {
  const focusDuration = Number(focusDurationValue);
  const breakDuration = Number(breakDurationValue);

  if (isNaN(focusDuration) || isNaN(breakDuration) ||
      focusDuration <= 0 || breakDuration <= 0) {
    throw new Errors.InvalidDurationValue();
  }

  const existingSession = await Chrono.findOne({
    userId,
    chronostopped: null,
  });

  if (existingSession) {
    throw new Errors.ChronoAlreadyRunning();
  }
  console.log('Starting chrono for user:', userId);

  const newSession = new Chrono({
    userId,
    focusDuration,
    breakDuration,
    chronostarted: new Date(),
    chronostopped: null,
    sessionsCompleted: 0,
  });

  

  await newSession.save();
  console.log("New session saved:", newSession);
  return newSession;
}; 
 

// Stop the chronometer session
/**
 * Stops the user's current active chronometer session.
 *
 * Updates the session with a stop timestamp and increments completed sessions
 * if the focus duration was met.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} The updated chrono session.
 * @throws {ActiveChronoNotFound} If no active session is found.
 */

const stopChrono = async (userId) => {
  const activeSession = await Chrono.findOne({ userId, chronostopped: null }).sort({ createdAt: -1 });

  if (!activeSession) throw new Errors.ActiveChronoNotFound();

  activeSession.chronostopped = new Date();
  const elapsedMinutes = (activeSession.chronostopped - activeSession.chronostarted) / 60000;

  if (elapsedMinutes >= activeSession.focusDuration) {
    activeSession.sessionsCompleted += 1; // Incrementar sesiones completadas
  }

  await activeSession.save();
  return activeSession;
};


// Get statistics of the chronometer sessions to use with the chart
/**
 * Retrieves and calculates detailed statistics from a user's chronometer sessions.
 *
 * Returns metrics such as total focus time, average focus/break time, and session
 * completion rates.
 *
 * @param {Object} req - Express request object, includes authenticated user.
 * @param {Object} res - Express response object to return JSON statistics.
 * @returns {void}
 *
 * @throws {PomellodoroStatsEmpty} If no session records exist for the user.
 * @throws {ChronoStatsError} On database or internal failure.
 */

const {
  ChronoStatsError,
  PomellodoroStatsEmpty
} = Errors;


const getChronoStats = async (req, res) => {
  try {
    console.log( req.user.id)
    const sessions = await Chrono.find({ userId: req.user.id });
    console.log( "Click a stats: \n",req.user.id)

    if (!sessions.length) throw new PomellodoroStatsEmpty();

    const today = new Date();

    const stats = sessions.reduce((acc, session) => {
      const { chronostarted, chronostopped, breakDuration = 0, sessionsCompleted = 0 } = session;

      if (!chronostarted) return acc;

      const effectiveStop = chronostopped || new Date();
      const focusTime = (new Date(effectiveStop) - new Date(chronostarted)) / 60000;

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

    const safeDiv = (num, den) => den ? num / den : 0;

    const totalTime = stats.totalFocusTime + stats.totalBreakTime;

    res.status(200).json({
      totalSessions: stats.totalSessions,
      completedSessions: stats.completedSessions,
      interruptedSessions: stats.interruptedSessions,
      sessions,
      totalFocusTime: stats.totalFocusTime,
      totalBreakTime: stats.totalBreakTime,
      totalTime,
      averageFocusTime: safeDiv(stats.totalFocusTime, stats.totalSessions),
      averageBreakTime: safeDiv(stats.totalBreakTime, stats.totalSessions),
      averageTime: safeDiv(totalTime, stats.totalSessions),
      averageSessionsCompleted: safeDiv(stats.totalSessionsCompleted, stats.totalSessions),
      averageSessionsInterrupted: safeDiv(stats.interruptedSessions, stats.totalSessions),
      averageSessionsCompletedPercentage: safeDiv(stats.completedSessions * 100, stats.totalSessions),
      averageSessionsInterruptedPercentage: safeDiv(stats.interruptedSessions * 100, stats.totalSessions),
      averageSessionsCompletedTime: safeDiv(stats.totalCompletedFocusTime, stats.completedSessions),
      averageSessionsInterruptedTime: safeDiv(stats.totalInterruptedFocusTime, stats.interruptedSessions),
      averageSessionsTime: safeDiv(stats.totalFocusTime, stats.totalSessions),
      averageSessionsCompletedTimePercentage: safeDiv(
        safeDiv(stats.totalCompletedFocusTime, stats.completedSessions) * 100,
        safeDiv(stats.totalFocusTime, stats.totalSessions)
      ),
      dailySessions: stats.dailySessions
    });

  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }
      res.status(500).json({ error: "Error getting Pomellodoro stats. User might not have stats yet." });
  }
  console.log( "Click a stats: \n",req.user.id)
  
};


// Pomellodoro cycle control

let pomellodoroActive = false;
let pomellodoroTimeouts = [];
/**
 * Starts a Pomellodoro cycle for the user.
 *
 * Runs 4 consecutive focus + break sessions. If interrupted or already running,
 * responds accordingly. Stops previous active session if one exists.
 *
 * @param {Object} req - Express request object (must contain focusDuration and breakDuration).
 * @param {Object} res - Express response object.
 * @returns {void}
 *
 * @throws {InvalidDurationValue} If durations are invalid.
 * @throws {ChronoAlreadyRunning} If an active chrono session is already running.
 */

const startPomellodoroCycle = async (req, res) => {
  const userId = req.user.id; // Asegúrate de que req.user._id esté definido
  
  const focus = Number(req.body.focusDuration);
  const rest = Number(req.body.breakDuration);

  if (pomellodoroActive) {
    return res.status(400).json({ message: '🍊✅ Pomellodoro already running' });
  }

  if (isNaN(focus) || isNaN(rest) || focus <= 0 || rest <= 0) {
    return res.status(400).json({ message: 'Invalid duration values' });
  }

  // 🔧 Cierre forzado de posibles sesiones previas
  try {
    await stopChrono(userId);
  } catch (e) {
    // Ignoramos si no hay ninguna sesión previa
  }

  pomellodoroActive = true;
  res.status(200).json({ message: '🍊✅ Pomellodoro started' });

  const cycles = 4;
  const workMs = focus * 60 * 1000;
  const breakMs = rest * 60 * 1000;

  const runCycle = async (i) => {
    if (!pomellodoroActive) return;

    try {
      await startChrono(userId, focus, rest); // Asegúrate de que userId esté definido
    } catch (e) {
      console.error(`❌ Error starting cycle ${i + 1}:`, e.message);
      pomellodoroActive = false;
      return;
    }

    const workTimeout = setTimeout(async () => {
      if (!pomellodoroActive) return;

      try {
        await stopChrono(userId);
      } catch (e) {
        console.error(`❌ Error stopping cycle ${i + 1}:`, e.message);
        pomellodoroActive = false;
        return;
      }

      if (i < cycles - 1) {
        const restTimeout = setTimeout(() => runCycle(i + 1), breakMs);
        pomellodoroTimeouts.push(restTimeout);
      } else {
        pomellodoroActive = false;
        console.log('✅ Pomellodoro finished');
      }
    }, workMs);

    pomellodoroTimeouts.push(workTimeout);
  };

  runCycle(0);
};

const {
  PomellodoroNotRunning,
  pomellodoroStopError
} = Errors;

/**
 * Stops the Pomellodoro cycle for the user.
 *
 * If the Pomellodoro cycle is not running, throws a PomellodoroNotRunning error.
 * If already running, stops all ongoing timeouts and sets the active state to false.
 * If an active chrono session is running, stops it.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 *
 * @throws {PomellodoroNotRunning} If the Pomellodoro cycle is not running.
 */
const stopPomellodoroCycle = async (req, res) => {
  const userId = req.user.id;

  try {
    if (!pomellodoroActive) throw new Errors.PomellodoroNotRunning();

    pomellodoroTimeouts.forEach(clearTimeout);
    pomellodoroTimeouts = [];
    pomellodoroActive = false;

    try {
      await stopChrono(userId); // Asegúrate de que esta función se esté llamando correctamente
    } catch (e) {
      console.warn('🍊✅ No active chrono to stop or already stopped');
    }

    res.status(200).json({ message: "🍊✅ Pomellodoro stopped" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || new Errors.pomellodoroStopError().message });
  }
};

const {
  pomellodoroStatusError
} = Errors;
/**
 * Returns the current status of the Pomellodoro cycle.
 * Includes whether the cycle is active, how many timeouts are set,
 * and how many have been executed.
 * The status contains three properties:
 * - `active`: A boolean indicating whether the Pomellodoro cycle is currently active.
 * - `timeouts`: The number of timeouts currently scheduled.
 * - `sessions`: The number of active sessions (i.e. focus + break sessions) currently running.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 *
 * @throws {pomellodoroStatusError} If an unexpected error occurs while retrieving the status.
 */

const getPomellodoroStatus = (req, res) => {
  try {
    const status = {
      running: pomellodoroActive,
      timeouts: pomellodoroTimeouts.length,
      sessions: pomellodoroTimeouts.filter(timeout => timeout !== null).length,
    };
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: Errors.pomellodoroStatusError() });
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