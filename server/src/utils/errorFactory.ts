import httpStatus from 'http-status-codes'


interface ICustomError extends Error {
    statusCode: number
    reason: string
}

class CustomError extends Error implements ICustomError {
    statusCode: number;
    reason: string;

    constructor(message?: string, name?: string, reason?: string, statusCode?: number) {
        super(message);
        this.name = name;
        this.reason = reason;
        this.statusCode = statusCode;
    }

    toJSON() {
        let errJson = {
            name: this.name,
            reason: this.reason
        };

        if (this.message) {
            errJson['message'] = this.message;
        }

        return errJson;
    }
}

class NotUniqueError extends CustomError {
    constructor(message?: string) {
        super(message, 'NotUniqueError', 'Resource already exists', httpStatus.CONFLICT);
    }
}

class NoDataError extends CustomError {
    constructor(message?: string) {
        super(message, 'NoDataError', 'Expected resource not present in the database', httpStatus.NOT_FOUND);
    }
}

class NotFoundError extends CustomError {
    constructor(message?: string) {
        super(message, 'NotFoundError', 'Resource not found', httpStatus.NOT_FOUND);
    }
}

class InternalServerError extends CustomError {
    constructor(message?: string) {
        super(message, 'InternalServerError', 'Something went wrong on the server side', httpStatus.INTERNAL_SERVER_ERROR);
    }
}

class FriendshipConstraintError extends CustomError {
    constructor(message?: string) {
        super(message, 'FriendshipConstraintError', 'Friendship constraints violated', httpStatus.UNPROCESSABLE_ENTITY);
    }
}

class NoAccessError extends CustomError {
    constructor(message?: string) {
        super(message, 'NoAccessError', 'User has no access to the resource', httpStatus.FORBIDDEN);
    }
}

class InvalidInputError extends CustomError {
    constructor(message?: string) {
        super(message, 'InvalidInputError', 'Invalid input', httpStatus.UNPROCESSABLE_ENTITY);
    }
}

// Error factory
function errorFactory(identifier: string | number, message?: string): CustomError {
    switch (identifier) {
        case '23505':
            return new NotUniqueError(message);
        case '22P02':
            return new InvalidInputError(message);
        case '404':
            return new NotFoundError(message);
        case '403':
            return new NoAccessError(message);
        case 0:
            return new NoDataError(message);
        default:
            return new InternalServerError(message);
    }
}

export {
    NotUniqueError,
    NoDataError,
    NotFoundError,
    InternalServerError,
    FriendshipConstraintError,
    InvalidInputError,
    CustomError,
    errorFactory
}
