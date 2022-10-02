import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { realEstatesRouter, userRouter } from '../api/routes';
import { notFoundHandler, errorHandler } from '../api/middleware';

dotenv.config();

const server = express();

const PORT = process.env.PORT ?? 3000;

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.use('/realestate', realEstatesRouter);
server.use('/user', userRouter);

server.use(errorHandler);
server.use(notFoundHandler);

server.listen(PORT, () => {
  console.log(`\nServer listening on port ${PORT}`);
});
