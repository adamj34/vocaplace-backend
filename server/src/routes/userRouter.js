import express from 'express';
import userController from '../controllers/userController';
import validate from '../validation/validateMiddleware.js';
import { updateUserSchema, updatePointsSchema, getVisitedUserIdSchema } from '../validation/userValidation.js';
import upload from '../utils/multerUpload.js';

const router = express.Router();

router
    .get('/', userController.getUserData)
    .get('/friends', userController.getFriendsData)
    .get('/groups', userController.getGroupsData)
    .get('/visit/:visitedUserId', validate(getVisitedUserIdSchema), userController.getVisitedUserData)
    .patch('/', upload.single('picture'), validate(updateUserSchema), userController.updateUser)
    .patch('/points', validate(updatePointsSchema), userController.updatePoints)
    .delete('/', userController.deleteUser)
    .delete('/profilePicture', userController.deleteProfilePicture)


export default router;
