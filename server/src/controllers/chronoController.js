import Chrono from '../models/chrono.js';
import Errors from "../utils/errors.js"; // ✅ Importación correcta

//start chrono session
const startChrono = async (userId, focusDuration, breakDuration) => {
  if (
    typeof focusDuration !== 'number' || focusDuration <= 0 ||
    typeof breakDuration !== 'number' || breakDuration <= 0
  ) {
    throw new InvalidDurationValue();
  }

  const existing = await Chrono.findOne({ userId, chronostopped: null });
  if (existing) throw new ChronoAlreadyRunning();

  const session = new Chrono({
    userId,
    focusDuration,
    breakDuration,
    chronostarted: new Date(),
    chronostopped: null,
    sessionsCompleted: 0,
  });

  await session.save();
  return session;
};


// Stop the chronometer session
const stopChrono = async (userId) => {
  const session = await Chrono.findOne({ userId, chronostopped: null }).sort({ createdAt: -1 });

  if (!session) throw new ActiveChronoNotFound();

  session.chronostopped = new Date();

  const duration = (session.chronostopped - session.chronostarted) / 60000;
  if (duration >= session.focusDuration) {
    session.sessionsCompleted += 1;
  }

  await session.save();
  return session;
};


// Get statistics of the chronometer sessions to use with the chart
const {
  ChronoStatsError,
  PomellodoroStatsEmpty
} = Errors;

const getChronoStats = async (req, res) => {
  try {
    const sessions = await Chrono.find({ userId: req.user.id });

    if (!sessions.length) throw new PomellodoroStatsEmpty();

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
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: new ChronoStatsError().message });
  }
};


// Pomellodoro cycle control
let pomellodoroActive = false;
let pomellodoroTimeouts = [];

const startPomellodoroCycle = async (req, res) => {
  const userId = req.user.id;
  const focus = Number(req.body.focusDuration);
  const rest = Number(req.body.breakDuration);

  if (pomellodoroActive) {
    return res.status(400).json({ message: 'Pomellodoro already running' });
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
  res.status(200).json({ message: 'Pomellodoro started' });

  const cycles = 4;
  const workMs = focus * 60 * 1000;
  const breakMs = rest * 60 * 1000;

  const runCycle = async (i) => {
    if (!pomellodoroActive) return;

    try {
      await startChrono(userId, focus, rest);
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
      console.warn('No active chrono to stop or already stopped');
    }

    res.status(200).json({ message: "🍊✅ Pomellodoro stopped" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || new pomellodoroStopError().message });
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
    res.status(500).json({ error: 'Error obtaining Pomellodoro status' });
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



