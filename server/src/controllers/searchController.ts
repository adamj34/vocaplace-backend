import httpStatus from 'http-status-codes';
import handleError from '../utils/errorHandler.js';
import searchService from '../services/searchService';
import logger from '../logger/logger';


const searchGroupsAndUsers = async (req, res) => {
    try {
        const searchPhrase = req.query.searchPhrase;
        const response = await searchService.searchGroupsAndUsers(searchPhrase);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in searchGroupsAndUsers controller');
        handleError(err, res);
    }
}

export default {
    searchGroupsAndUsers
};
