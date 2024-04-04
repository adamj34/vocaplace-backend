import httpStatus from 'http-status-codes';
import handleError from '../utils/errorHandler.js';
import unitService from '../services/unitService';
import logger from '../logger/logger';


const createUnit = async (req, res) => {
    try {
        const response = await unitService.createUnit(req.body.unit, req.body.icon);
        res.status(httpStatus.CREATED).json(response);
    } catch (err) {
        logger.error(err, 'Error in createUnit controller');
        handleError(err, res);
    }
}

const getGeneralUserProgress = async (req, res) => {
    try {
        const response = await unitService.getGeneralUserProgress(req.userId);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in getGeneralUserProgress controller');
        handleError(err, res);
    }
}

const getDetailedUserProgress = async (req, res) => {
    try {
        const response = await unitService.getDetailedUserProgress(req.userId, req.params.id);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in getDetailedUserProgress controller');
        handleError(err, res);
    }
}

const getUnitOverview = async (req, res) => {
    try {
        const response = await unitService.getUnitOverview();
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in getUnitOverview controller');
        handleError(err, res);
    }
}


export default {
    createUnit,
    getGeneralUserProgress,
    getDetailedUserProgress,
    getUnitOverview
};
