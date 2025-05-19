import Chrono from '../models/chrono.js';

const startChrono = async (req, res) => {
  try {
    const { focusDuration, breakDuration } = req.body;
    const activeSession = await Chrono.findOne({userId: req.user.id, chronostopped: null});

    if (typeof focusDuration !== 'number' || focusDuration <= 0 || typeof breakDuration !== 'number' || breakDuration <= 0) {
    return res.status(400).json({ message: 'Invalid duration values' });
    } else if (activeSession) {
      return res.status(400).json({ message: 'Chronometer is already running' });
    }

    const newSession = new Chrono({
      userId: req.user.id,
      focusDuration,
      breakDuration,
      chronostarted: new Date(),
      chronostopped: null,
      sessionsCompleted: 0,
    });

    await newSession.save();
    res.status(201).json({ message: 'Started Chronometer', session: newSession });
  } catch (error) {
    res.status(500).json({ message: 'Error starting Chronometer', error: error.message });
  }
};


const stopChrono = async (req, res) => {
  try {
    const session = await Chrono.findOne({ userId: req.user.id }).sort({ createdAt: -1 });// Get the latest session
    //const session = await Chrono.findOne({ userId: req.user.id }).sort({ createdAt: -1 }).limit(1);
    //const session = await Chrono.findOne({ userId: req.user.id }).sort({ createdAt: -1 }).exec();
    //if (!session || session.chronostopped || session.chronostopped !== null || session.chronostopped !== undefined) {
    //  return res.status(404).json({ message: 'No active chronometer session to stop' });
    // }
    if (!session || session.chronostopped != null) {
    return res.status(404).json({ message: 'No active chronometer session to stop' });
   }

    session.chronostopped = new Date();
    const duration = (session.chronostopped - session.chronostarted) / 60000; // Duration in minutes

    if (duration >= session.focusDuration) {
      session.sessionsCompleted += 1; // Increment the completed sessions count
    }

    await session.save();
    res.status(200).json({ message: 'Stopped Chronometer', session });
  } catch (error) {
    res.status(500).json({ message: 'Error stopping Chronometer', error: error.message });
  }
};

// Get statistics of the chronometer sessions to use with the chart
const getChronoStats = async (req, res) => {
  try {
    const sessions = await Chrono.find({ userId: req.user.id });

    const today = new Date();
    const stats = sessions.reduce((acc, session) => {
      const { chronostarted, chronostopped, breakDuration, sessionsCompleted } = session;

      // Asegurarse de que chronostopped esté definido
      if (!chronostarted || !chronostopped) return acc;

      const focusTime = (chronostopped - chronostarted) / 60000; // en minutos

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
    res.status(500).json({ message: 'Error al obtener las estadísticas del cronómetro', error: error.message });
  }
};



// Pomellodoro cycle control
let pomellodoroActive = false;
let pomellodoroTimeouts = [];

const startPomellodoroCycle = async (req, res) => {
  if (pomellodoroActive) {
    return res.status(400).json({ message: "Pomellodoro cycle already running." });
  }

  pomellodoroActive = true;

  const workDuration = 60 * 1000;       // 1 minute for testing
  const breakDuration = 30 * 1000;      // 0.5 minute for testing
  const cycles = 4;

  const executeCycle = async (cycle) => {
    if (!pomellodoroActive) return;

    console.log(`➡️ Cycle ${cycle + 1} - startChrono`);

    try {
      await startChrono(req, res); // Start the chronometer
    } catch (err) {
      console.error("Error starting chrono:", err);
    }

    const workTimeout = setTimeout(async () => {
      if (!pomellodoroActive) return;

      console.log(`⏸️ Cycle ${cycle + 1} - stopChrono`);
      try {
        await stopChrono(req, res);
      } catch (err) {
        console.error("Error stopping chrono:", err);
      }

      if (cycle < cycles - 1) {
        const breakTimeout = setTimeout(() => executeCycle(cycle + 1), breakDuration);
        pomellodoroTimeouts.push(breakTimeout);
      } else {
        console.log("✅ Pomellodoro cycle completed");
        pomellodoroActive = false;
      }
    }, workDuration);

    pomellodoroTimeouts.push(workTimeout);
  };

  executeCycle(0);
  res.status(200).json({ message: "Pomellodoro cycle started" });
};

const stopPomellodoroCycle = async (req, res) => {
  if (!pomellodoroActive) {
    return res.status(400).json({ message: "No Pomellodoro cycle is running." });
  }

  console.log("🛑 Interrumpiendo Pomellodoro...");
  pomellodoroActive = false;

  pomellodoroTimeouts.forEach(clearTimeout);
  pomellodoroTimeouts = [];

  try {
    await stopChrono(req, res); // if were in a cycle, stop the chronometer
  } catch (err) {
    console.error("Error stopping chrono:", err);
  }

  res.status(200).json({ message: "Pomellodoro cycle stopped" });
};



export default {
  startChrono,
  stopChrono,
  getChronoStats,
  startPomellodoroCycle,
  stopPomellodoroCycle,
};



/*

const getChronoStats = async (req, res) => {
  try {
    const sessions = await Chrono.find({ userId: req.user.id });

    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(session => session.sessionsCompleted > 0).length;
    const interruptedSessions = totalSessions - completedSessions;
    const totalFocusTime = sessions.reduce((acc, session) => acc + (session.chronostopped - session.chronostarted) / 60000, 0); // Total focus time in minutes
    const totalBreakTime = sessions.reduce((acc, session) => acc + session.breakDuration, 0); // Total break time in minutes
    const totalTime = totalFocusTime + totalBreakTime; // Total time in minutes
    const averageFocusTime = totalFocusTime / totalSessions || 0; // Average focus time in minutes
    const averageBreakTime = totalBreakTime / totalSessions || 0; // Average break time in minutes
    const averageTime = totalTime / totalSessions || 0; // Average time in minutes
    const averageSessionsCompleted = sessions.reduce((acc, session) => acc + session.sessionsCompleted, 0) / totalSessions || 0; // Average sessions completed
    const averageSessionsInterrupted = sessions.reduce((acc, session) => acc + (session.sessionsCompleted === 0 ? 1 : 0), 0) / totalSessions || 0; // Average sessions interrupted
    const averageSessions = sessions.reduce((acc, session) => acc + session.sessionsCompleted, 0) / totalSessions || 0; // Average sessions
    const averageSessionsCompletedPercentage = (completedSessions / totalSessions) * 100 || 0; // Average sessions completed percentage
    const averageSessionsInterruptedPercentage = (interruptedSessions / totalSessions) * 100 || 0; // Average sessions interrupted percentage
    const averageSessionsPercentage = (averageSessions / totalSessions) * 100 || 0; // Average sessions percentage
    const averageSessionsCompletedTime = sessions.reduce((acc, session) => acc + (session.sessionsCompleted > 0 ? (session.chronostopped - session.chronostarted) / 60000 : 0), 0) / completedSessions || 0; // Average sessions completed time in minutes
    const averageSessionsInterruptedTime = sessions.reduce((acc, session) => acc + (session.sessionsCompleted === 0 ? (session.chronostopped - session.chronostarted) / 60000 : 0), 0) / interruptedSessions || 0; // Average sessions interrupted time in minutes
    const averageSessionsTime = sessions.reduce((acc, session) => acc + (session.chronostopped - session.chronostarted) / 60000, 0) / totalSessions || 0; // Average sessions time in minutes
    const averageSessionsCompletedTimePercentage = (averageSessionsCompletedTime / totalSessions) * 100 || 0; // Average sessions completed time percentage
    const daylySessions = sessions.filter(session => {
      const sessionDate = new Date(session.chronostarted);
      const today = new Date();
      return sessionDate.getDate() === today.getDate() && sessionDate.getMonth() === today.getMonth() && sessionDate.getFullYear() === today.getFullYear();
    });

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
      averageSessions,
      averageSessionsCompletedPercentage,
      averageSessionsInterruptedPercentage,
      averageSessionsPercentage,
      averageSessionsCompletedTime,
      averageSessionsInterruptedTime,
      averageSessionsTime,
      averageSessionsCompletedTimePercentage,
      daylySessions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting chronometer stats', error: error.message });
  }
};
*/