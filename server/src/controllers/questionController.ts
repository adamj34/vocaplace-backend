import questionService from '../services/questionService';
import httpStatus from 'http-status-codes';
import handleError from '../utils/errorHandler.js';
import logger from '../logger/logger';


const createQuestion = async (req, res) => {
    try {
        const response = await questionService.createQuestion(req.body);
        res.status(httpStatus.CREATED).json(response);
    } catch (err) {
        logger.error(err, 'Error in createQuestion controller');
        handleError(err, res);
    }
}

const getQuiz = async (req, res) => {
    try {
        const response = await questionService.getQuiz(req.userId, +req.query.unitId, +req.query.topicId);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in getQuiz controller');
        handleError(err, res);
    }
}

const addToAnswered = async (req, res) => {
    try {
        const response = await questionService.addToAnswered(req.userId, req.body.questionIds);
        res.status(httpStatus.CREATED).json(response);
    } catch (err) {
        logger.error(err, 'Error in addToAnswered controller');
        handleError(err, res);
    }
}

const addToRepetition = async (req, res) => {
    try {
        const response = await questionService.addToRepetition(req.userId, req.body.questionIds);
        res.status(httpStatus.CREATED).json(response);
    } catch (err) {
        logger.error(err, 'Error in addToRepetition controller');
        handleError(err, res);
    }
}

const getRepetition = async (req, res) => {
    try {
        const response = await questionService.getRepetition(req.userId);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in getRepetition controller');
        handleError(err, res);
    }
}

const getRepetitionOverview = async (req, res) => {
    try {
        const response = await questionService.getRepetitionOverview(req.userId);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in getRepetitionOverview controller');
        handleError(err, res);
    }
}

export default {
    createQuestion,
    getQuiz,
    getRepetition,
    addToAnswered,
    addToRepetition,
    getRepetitionOverview
}
