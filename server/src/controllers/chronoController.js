import Chrono from '../models/chrono.js';

//start chrono session
const startChrono = async (userId, focusDuration, breakDuration) => {
  if (isNaN(focusDuration) || isNaN(breakDuration)) {
    throw new Error('Invalid duration values');
  }

  const existing = await Chrono.findOne({ userId, chronostopped: null });
  if (existing) throw new Error('Chronometer is already running');

  const session = new Chrono({
    userId,
    focusDuration,
    breakDuration,
    chronostarted: new Date(),
    chronostopped: null,
    sessionsCompleted: 0,
  });

  await session.save();
};

// Stop the chronometer session
const stopChrono = async (userId) => {
  const session = await Chrono.findOne({ userId }).sort({ createdAt: -1 });
  if (!session || session.chronostopped) return;

  session.chronostopped = new Date();
  const duration = (session.chronostopped - session.chronostarted) / 60000;
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
  const focus = Number(req.body.focusDuration);
  const rest = Number(req.body.breakDuration);

  if (pomellodoroActive) {
    return res.status(400).json({ message: 'Pomellodoro already running' });
  }

  if (isNaN(focus) || isNaN(rest) || focus <= 0 || rest <= 0) {
    return res.status(400).json({ message: 'Invalid duration values' });
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

export const stopPomellodoroCycle = async (req, res) => {
  const userId = req.user.id;

  if (!pomellodoroActive) {
    return res.status(400).json({ message: 'No Pomellodoro running' });
  }

  // Cancel all timeouts
  pomellodoroTimeouts.forEach(clearTimeout);
  pomellodoroTimeouts = [];
  pomellodoroActive = false;

  try {
    await stopChrono(userId);
  } catch (e) {
    console.warn('No active chrono to stop or already stopped');
  }

  res.status(200).json({ message: 'Pomellodoro stopped' });
};

/*
export const getPomellodoroStatus = async (req, res) => {
  res.status(200).json({ running: pomellodoroActive });
};*/

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

