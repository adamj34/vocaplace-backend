import express from 'express';
import questionController from '../controllers/questionController';
import validate from '../validation/validateMiddleware.js';
import { createQuestionSchema, getQuizSchema, addToAnsweredSchema, addToRepetitionSchema } from '../validation/questionValidation.js';

const router = express.Router();

router
    .post('/', validate(createQuestionSchema), questionController.createQuestion)
    .get('/quiz', validate(getQuizSchema), questionController.getQuiz)
    .post('/answered', validate(addToAnsweredSchema), questionController.addToAnswered)
    .post('/repetition', validate(addToRepetitionSchema), questionController.addToRepetition)
    .get('/repetition', questionController.getRepetition)
    .get('/repetition/overview', questionController.getRepetitionOverview);


export default router;
