import express from 'express';
import searchController from '../controllers/searchController';
import validate from '../validation/validateMiddleware.js';
import { searchGroupsAndUsersSchema } from '../validation/searchValidation.js';

const router = express.Router();


router
    .get('/', validate(searchGroupsAndUsersSchema), searchController.searchGroupsAndUsers);


export default router;
