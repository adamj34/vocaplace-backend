import { Response } from 'express';
import { errorFactory, CustomError } from './errorFactory.js';
import { pgp } from '../db/connection/db';


const handleError = (err, res: Response) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json(err);
    } else {
        if (err.code) {
            const error = errorFactory(err.code);
            res.status(error.statusCode).json(error);
        } else if (err instanceof pgp.errors.QueryResultError) {
            const error = errorFactory(err.code);
            res.status(error.statusCode).json(error);
        } else {
            res.status(500).json(errorFactory('500'));
        }
    }
}

export default handleError;
