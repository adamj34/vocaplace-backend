import express from 'express';
import rankingController from '../controllers/rankingController';

const router = express.Router();

router
    .get('/top', rankingController.getTopUsersRanking)
    .get('/friends', rankingController.getFriendsRanking);


export default router;
