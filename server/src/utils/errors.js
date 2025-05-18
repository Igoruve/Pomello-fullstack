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
 * CHRONO
 */
class FocusDurationNotProvided extends Error {
    constructor() {
        super("Focus duration not provided");
        this.statusCode = 400;
    }
}

class BreakDurationNotProvided extends Error {
    constructor() {
        super("Break duration not provided");
        this.statusCode = 400;
    }
}

class ChronoNotFound extends Error {
    constructor() {
        super("Chrono session not found");
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

export {
    ProjectTitleNotProvided, 
    ProjectDescriptionNotProvided,
    ProjectNotFound,
    TaskTitleNotProvided,
    TaskNotFound,
    ListTitleNotProvided,
    ListNotFound,
    FocusDurationNotProvided,
    BreakDurationNotProvided,
    ChronoNotFound,
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserEmailAlreadyExists,
    UserInvalidCredentials,
    UserNotFound
};