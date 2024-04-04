import httpStatus from 'http-status-codes';
import handleError from '../utils/errorHandler.js';
import userRelationsService from '../services/userRelationsService';
import logger from '../logger/logger';


const sendFriendRequest = async (req, res) => {
    try {
        const response = await userRelationsService.sendFriendRequest(req.userId, req.params.id);
        res.status(httpStatus.CREATED).json(response);
    } catch (err) {
        logger.error(err, 'Error in sendFriendRequest controller');
        handleError(err, res);
    }
}

const acceptFriendRequest = async (req, res) => {
    try {
        const response = await userRelationsService.acceptFriendRequest(req.userId, req.params.id);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in acceptFriendRequest controller');
        handleError(err, res);
    }
}

const deleteReceivedFriendRequest = async (req, res) => {
    try {
        const response = await userRelationsService.deleteReceivedFriendRequest(req.userId, req.params.id);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in deleteReceivedFriendRequest controller');
        handleError(err, res);
    }
}

const deleteSentFriendRequest = async (req, res) => {
    try {
        const response = await userRelationsService.deleteSentFriendRequest(req.userId, req.params.id);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in deleteSentFriendRequest controller');
        handleError(err, res);
    }
}

const checkRelationship = async (req, res) => {
    try {
        const response = await userRelationsService.checkRelationship(req.userId, req.params.id);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in checkRelationship controller');
        handleError(err, res);
    }
}

const checkPendingRequests = async (req, res) => {
    try {
        const response = await userRelationsService.checkPendingRequests(req.userId);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in checkPendingRequests controller');
        handleError(err, res);
    }
}

const deleteFriend = async (req, res) => {
    try {
        const response = await userRelationsService.deleteFriend(req.userId, req.params.id);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in deleteFriend controller');
        handleError(err, res);
    }
}

export default {
    sendFriendRequest,
    acceptFriendRequest,
    deleteReceivedFriendRequest,
    deleteSentFriendRequest,
    checkRelationship,
    checkPendingRequests,
    deleteFriend
};
