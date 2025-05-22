/**
 * PROJECTS
 */
class ProjectTitleNotProvided extends Error {
    constructor() {
        super("Project title not provided");
        this.statusCode = 400;
    }
}

class ProjectDescriptionNotProvided extends Error {
    constructor() {
        super("Project description not provided");
        this.statusCode = 400;
    }
}

class ProjectNotFound extends Error {
    constructor() {
        super("Project not found");
        this.statusCode = 404;
    }
}

/**
 * TASKS
 */
class TaskTitleNotProvided extends Error {
    constructor() {
        super("Task title not provided");
        this.statusCode = 400;
    }
}

class TaskNotFound extends Error {
    constructor() {
        super("Task not found");
        this.statusCode = 404;
    }
}

/**
 * LISTS
 */
class ListTitleNotProvided extends Error {
    constructor() {
        super("List title not provided");
        this.statusCode = 400;
    }
}

class ListNotFound extends Error {
    constructor() {
        super("List not found");
        this.statusCode = 404;
    }
}


/**
 * USERS
 */
class UserNameNotProvided extends Error {
    constructor() {
        super("User name not provided");
        this.statusCode = 400;
    }
}

class UserEmailNotProvided extends Error {
    constructor() {
        super("User email not provided");
        this.statusCode = 400;
    }
}

class UserPasswordNotProvided extends Error {
    constructor() {
        super("User password not provided");
        this.statusCode = 400;
    }
}

class UserEmailAlreadyExists extends Error {
    constructor() {
        super("User email already exists");
        this.statusCode = 400;
    }
}

class UserInvalidCredentials extends Error {
    constructor() {
        super("Invalid credentials");
        this.statusCode = 401;
    }
}

class UserNotFound extends Error {
    constructor() {
        super("User not found");
        this.statusCode = 404;
    }
}

//-------------------------------
// --- CHRONO ERRORS ---
//-------------------------------

class FocusDurationNotProvided extends Error {
  constructor() {
    super("🍅❌ Focus duration not provided");
    this.name = "FocusDurationNotProvided";
    this.statusCode = 400;
  }
}

class BreakDurationNotProvided extends Error {
  constructor() {
    super("🍅❌ Break duration not provided");
    this.name = "BreakDurationNotProvided";
    this.statusCode = 400;
  }
}

class InvalidDurationValue extends Error {
  constructor() {
    super("🍅❌ Invalid Duration Values, must be numbers greater than zero");
    this.name = "InvalidDurationValue";
    this.statusCode = 400;
  }
}

class ChronoAlreadyRunning extends Error {
  constructor() {
    super("🍅❌ Chronometer already running");
    this.name = "ChronoAlreadyRunning";
    this.statusCode = 400;
  }
}

class ActiveChronoNotFound extends Error {
  constructor() {
    super("🍅❌ Active chronometer not found");
    this.name = "ChronoNotFound";
    this.statusCode = 404;
  }
}

class ChronoStatsError extends Error {
  constructor() {
    super("🍅❌ Error obtaining chronometer statistics");
    this.name = "ChronoStatsError";
    this.statusCode = 404;
  }
}

class PomellodoroAlReadyRunning extends Error {
  constructor() {
    super("🍅❌ A Pomellodoro cycle is already running");
    this.name = "PomellodoroAlreadyRunning";
    this.statusCode = 400;
  }
}

class PomellodoroNotRunning extends Error {
  constructor() {
    super("🍅❌ No Pomellodoro cycle currently running");
    this.name = "PomellodoroNotRunning";
    this.statusCode = 400;
  }
}

class pomellodoroStartError extends Error {
  constructor() {
    super("🍅❌ Error starting Pomellodoro cycle");
    this.name = "PomellodoroStatsError";
    this.statusCode = 404;
  }
}

class pomellodoroStopError extends Error {
  constructor() {
    super("🍅❌ Error stopping Pomellodoro cycle");
    this.name = "PomellodoroStatsError";
    this.statusCode = 404;
  }
}
class pomellodoroStatusError extends Error {
  constructor() {
    super("🍅❌ Error obtaining pomellodoro status");
    this.name = "PomellodoroStatusError";
    this.statusCode = 404;
  }
}

class PomellodorotatsRetrievalError extends Error {
  constructor() {
    super("🍅❌ Failed to retrieve Pomellodoro statistics");
    this.name = "ChronoStatsRetrievalError";
    this.statusCode = 500;
  }
}

class PomellodoroStatsEmpty extends Error {
  constructor() {
    super("🍊✅ No sessions found, stats are empty");
    this.name = "ChronoStatsEmpty";
    this.statusCode = 200; // porque no es un error en sí
  }
}

export default {
    ProjectTitleNotProvided, 
    ProjectDescriptionNotProvided,
    ProjectNotFound,
    TaskTitleNotProvided,
    TaskNotFound,
    ListTitleNotProvided,
    ListNotFound,
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserEmailAlreadyExists,
    UserInvalidCredentials,
    UserNotFound, 
    FocusDurationNotProvided,
    BreakDurationNotProvided,
    InvalidDurationValue,
    ChronoAlreadyRunning,
    ActiveChronoNotFound,
    ChronoStatsError,
    PomellodoroAlReadyRunning,
    PomellodoroNotRunning,
    pomellodoroStartError,
    pomellodoroStopError,
    pomellodoroStatusError,
    PomellodorotatsRetrievalError,
    }
/* const ChronoErrors = {
  FocusDurationNotProvided,
  BreakDurationNotProvided,
  InvalidDurationValue,
  ChronoAlreadyRunning,
  ActiveChronoNotFound,
  chonoStatsError,
  PomellodoroAlReadyRunning,
  PomellodoroNotRunning,
  pomellodoroStartError,
  pomellodoroStopError,
  pomellodoroStatusError,
  PomellodorotatsRetrievalError,
  PomellodoroStatsEmpty
};

export default {
    ProjectTitleNotProvided, 
    ProjectDescriptionNotProvided,
    ProjectNotFound,
    TaskTitleNotProvided,
    TaskNotFound,
    ListTitleNotProvided,
    ListNotFound,
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserEmailAlreadyExists,
    UserInvalidCredentials,
    UserNotFound, 
    ChronoErrors,
};
 */