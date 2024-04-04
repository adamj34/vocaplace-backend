import express from 'express';
import userRelationsController from '../controllers/userRelationsController';
import validate from '../validation/validateMiddleware.js';
import { friendRelationSchema } from '../validation/userRelationsValidation.js';

const router = express.Router();


router
    .get('/check/user/:id', validate(friendRelationSchema), userRelationsController.checkRelationship)
    .get('/pending', userRelationsController.checkPendingRequests)
    .post('/request/friend/:id', validate(friendRelationSchema), userRelationsController.sendFriendRequest)
    .patch('/accept/friend/:id', validate(friendRelationSchema), userRelationsController.acceptFriendRequest)
    .delete('/request/sent/friend/:id', validate(friendRelationSchema), userRelationsController.deleteSentFriendRequest)
    .delete('/request/received/friend/:id', validate(friendRelationSchema), userRelationsController.deleteReceivedFriendRequest)
    .delete('/friend/:id', validate(friendRelationSchema), userRelationsController.deleteFriend)

export default router;
