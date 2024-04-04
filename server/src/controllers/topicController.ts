import httpStatus from 'http-status-codes';
import handleError from '../utils/errorHandler.js';
import topicService from '../services/topicService';
import logger from '../logger/logger';


const createTopic = async (req, res) => {
    try {
        const response = await topicService.createTopic(req.body.topic, req.body.unit, req.body.icon);
        res.status(httpStatus.CREATED).json(response);
    } catch (error) {
        logger.error(error, 'Error in createTopic controller');
        handleError(error, res);
    }
}

export default {
    createTopic
}
