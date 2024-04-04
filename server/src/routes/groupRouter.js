import express from 'express';
import groupController from '../controllers/groupController';
import { createGroupSchema, memberOperationsSchema, updateGroupSchema, groupIdSchema } from '../validation/groupValidation.js';
import validate from '../validation/validateMiddleware.js';
import upload from '../utils/multerUpload.js';

const router = express.Router();


router
    .get('/:id', validate(groupIdSchema), groupController.getGroupInfo)
    .post('/', upload.single('picture'), validate(createGroupSchema), groupController.createGroup)
    .post('/join/:id', validate(groupIdSchema), groupController.joinGroup)
    .delete('/picture/:id', validate(groupIdSchema), groupController.deleteGroupPicture)
    .delete('/membership/:id/:userId', validate(memberOperationsSchema), groupController.deleteMember)
    .delete('/:id', validate(groupIdSchema), groupController.deleteGroup)
    .patch('/membership/:id/:userId', validate(memberOperationsSchema), groupController.updateMembership)
    .patch('/admin/:id/:userId', validate(memberOperationsSchema), groupController.passAdminRights)
    .patch('/:id', upload.single('picture'), validate(updateGroupSchema), groupController.updateGroup)

export default router;
