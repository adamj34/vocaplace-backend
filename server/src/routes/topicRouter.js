import express from 'express';
import topicController from '../controllers/topicController';
import validate from '../validation/validateMiddleware.js';
import { createTopicSchema } from '../validation/topicValidation.js';

const router = express.Router();

router
    .post('/', validate(createTopicSchema), topicController.createTopic);

export default router;
