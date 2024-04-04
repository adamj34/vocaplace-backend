import express from "express";
import cors from "cors";
import PinoHttp from "pino-http";
import logger from "./logger/logger";

// database imports
import { db } from "./db/connection/db";
import getUserData from "./routes/getUserDataMiddleware.js";
import testConnection from "./db/connection/testConnection.js";
import userRouter from "./routes/userRouter.js";
import unitRouter from "./routes/unitRouter.js";
import userRelationsRouter from "./routes/userRelationsRouter.js";
import questionRouter from "./routes/questionRouter.js";
import topicRouter from "./routes/topicRouter.js";
import groupRouter from "./routes/groupRouter.js";
import searchRouter from "./routes/searchRouter.js";
import rankingRouter from "./routes/rankingRouter.js";

import keycloak from './Keycloak.js';

const app = express();

await testConnection(db);

// server configuration
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8080']
}))

// logger configuration
app.use(PinoHttp({
    logger,
    serializers: {
        req: req => ({
            method: req.method,
            url: req.url,
            query: req.query,
        }),
        res: res => ({ statusCode: res.statusCode })
    }
}));


app.use(getUserData);
app.use(keycloak.middleware());
app.use(keycloak.protect());
app.use('/search', searchRouter);
app.use('/user', userRouter);
app.use('/units', unitRouter);
app.use('/topics', topicRouter);
app.use('/relationships', userRelationsRouter);
app.use('/questions', questionRouter);
app.use('/groups', groupRouter);
app.use('/rankings', rankingRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
}); 
