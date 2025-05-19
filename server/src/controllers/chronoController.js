import Chrono from '../models/chrono.js';

// Start the chronometer session
const startChrono = async (userId, focusDuration, breakDuration) => {
  const focus = Number(focusDuration);
  const rest = Number(breakDuration);

  if (isNaN(focus) || focus!='number' || focus <= 0 || isNaN(rest) || rest <= 0) {
    throw new Error('Invalid duration values');
  }

  const activeSession = await Chrono.findOne({ userId, chronostopped: null });
  if (activeSession) {
    throw new Error('Chronometer is already running');
  }

  const newSession = new Chrono({
    userId,
    focusDuration: focus,
    breakDuration: rest,
    chronostarted: new Date(),
    chronostopped: null,
    sessionsCompleted: 0,
  });

  await newSession.save();
};

// Stop the chronometer session
const stopChrono = async (userId) => {
  const session = await Chrono.findOne({ userId }).sort({ createdAt: -1 });
  if (!session || session.chronostopped != null) {
    throw new Error('No active chronometer session to stop');
  }

  session.chronostopped = new Date();
  const duration = (session.chronostopped - session.chronostarted) / 60000; // Duration in minutes

  if (duration >= session.focusDuration) {
    session.sessionsCompleted += 1; 
  }

  await session.save();
};


// Get statistics of the chronometer sessions to use with the chart
const getChronoStats = async (req, res) => {
  try {
    const sessions = await Chrono.find({ userId: req.user.id });

    const today = new Date();
    const stats = sessions.reduce((acc, session) => {
      const { chronostarted, chronostopped, breakDuration, sessionsCompleted } = session;

      if (!chronostarted || !chronostopped) return acc;

      const focusTime = (chronostopped - chronostarted) / 60000; // in minutes

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

    const totalTime = totalFocusTime + totalBreakTime;
    const averageFocusTime = totalFocusTime / totalSessions || 0;
    const averageBreakTime = totalBreakTime / totalSessions || 0;
    const averageTime = totalTime / totalSessions || 0;
    const averageSessionsCompleted = totalSessionsCompleted / totalSessions || 0;
    const averageSessionsInterrupted = interruptedSessions / totalSessions || 0;
    const averageSessionsCompletedPercentage = (completedSessions / totalSessions) * 100 || 0;
    const averageSessionsInterruptedPercentage = (interruptedSessions / totalSessions) * 100 || 0;
    const averageSessionsCompletedTime = totalCompletedFocusTime / completedSessions || 0;
    const averageSessionsInterruptedTime = totalInterruptedFocusTime / interruptedSessions || 0;
    const averageSessionsTime = totalFocusTime / totalSessions || 0;
    const averageSessionsCompletedTimePercentage = (averageSessionsCompletedTime / averageSessionsTime) * 100 || 0;

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
    res.status(500).json({ message: 'Error obtaining statistics', error: error.message });
  }
};


// Pomellodoro cycle control
let pomellodoroActive = false;
let pomellodoroTimeouts = [];

const startPomellodoroCycle = async (req, res) => {
  const userId = req.user.id;
  const { focusDuration, breakDuration } = req.body;

  if (pomellodoroActive) {
    return res.status(400).json({ message: "Pomellodoro already running" });
  }

  pomellodoroActive = true;
  const cycles = 4;
  const workMs = focusDuration * 60 * 1000;
  const breakMs = breakDuration * 60 * 1000;

  const runCycle = async (i) => {
    if (!pomellodoroActive) return;

    try {
      await startChrono(userId, focusDuration, breakDuration);
    } catch (e) {
      pomellodoroActive = false;
      return res.status(400).json({ message: `Error starting the Pomellodory Cycle ${i + 1}: ${e.message}` });
    }

    const workTimeout = setTimeout(async () => {
      if (!pomellodoroActive) return;

      try {
        await stopChrono(userId);
      } catch (e) {
        pomellodoroActive = false;
        return res.status(400).json({ message: `Error stopping the Pomellodory Cycle ${i + 1}: ${e.message}` });
      }

      if (i < cycles - 1) {
        const breakTimeout = setTimeout(() => runCycle(i + 1), breakMs);
        pomellodoroTimeouts.push(breakTimeout);
      } else {
        pomellodoroActive = false;
      }
    }, workMs);

    pomellodoroTimeouts.push(workTimeout);
  };

  await runCycle(0);
  return res.status(200).json({ message: "Pomellodoro started" });
};

const stopPomellodoroCycle = async (req, res) => {
  const userId = req.user.id;

  if (!pomellodoroActive) {
    return res.status(400).json({ message: "No Pomellodoro cycle is running" });
  }

  pomellodoroTimeouts.forEach(clearTimeout);
  pomellodoroTimeouts = [];
  pomellodoroActive = false;

  try {
    await stopChrono(userId);
  } catch (_) {
    // silencioso
  }

  return res.status(200).json({ message: "Pomellodoro cycle stopped" });
};


const getPomellodoroStatus = () => {
  return {
    active: pomellodoroActive,
    timeouts: pomellodoroTimeouts.length,
  };
};
 

export default {
  startChrono,
  stopChrono,
  getChronoStats,
  startPomellodoroCycle,
  stopPomellodoroCycle,
  getPomellodoroStatus
};
export { startChrono, stopChrono, getChronoStats, startPomellodoroCycle, stopPomellodoroCycle, getPomellodoroStatus };