import httpStatus from 'http-status-codes';
import handleError from '../utils/errorHandler.js';
import userService from '../services/userService';
import logger from '../logger/logger';


const getUserData = async (req, res) => {
    try {
        const userData = await userService.getUserData(req.userId, req.username);
        res.status(httpStatus.OK).json(userData);
    } catch (err) {
        logger.error(err, 'Error in getUserData controller');
        handleError(err, res);
    }
}

const deleteUser = async (req, res) => {
    try {
        const response = await userService.deleteUser(req.userId);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in deleteUser controller');
        handleError(err, res);
    }
}

const deleteProfilePicture = async (req, res) => {
    try {
        const response = await userService.deleteProfilePicture(req.userId);
        res.status(httpStatus.NO_CONTENT).json(response);
    } catch (err) {
        logger.error(err, 'Error in deleteProfilePicture controller');
        handleError(err, res);
    }
}

const updateUser = async (req, res) => {
    console.log('body')
    try {
        const response = await userService.updateUser(req.userId, req.body);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in updateUser controller');
        handleError(err, res);
    }
}

const updatePoints = async (req, res) => {
    try {
        const response = await userService.updatePoints(req.userId, +req.body.points);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in updatePoints controller');
        handleError(err, res);
    }
}

const getFriendsData = async (req, res) => {
    try {
        const response = await userService.getFriendsData(req.userId);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in getFriendsData controller');
        handleError(err, res);
    }
}

const getGroupsData = async (req, res) => {
    try {
        const response = await userService.getGroupsData(req.userId);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in getGroupsData controller');
        handleError(err, res);
    }
}

const getVisitedUserData = async (req, res) => {
    try {
        const response = await userService.getVisitedUserData(req.userId, req.params.visitedUserId);
        res.status(httpStatus.OK).json(response);
    } catch (err) {
        logger.error(err, 'Error in getVisitedUserData controller');
        handleError(err, res);
    }
}

export default {
    getUserData,
    deleteUser,
    deleteProfilePicture,
    updateUser,
    updatePoints,
    getFriendsData,
    getGroupsData,
    getVisitedUserData
};
