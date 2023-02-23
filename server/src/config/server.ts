import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';

import { realEstatesRouter, imageRouter, userRouter, assetRouter } from '../api/routes';
import { notFoundHandler, errorHandler } from '../api/middleware';

dotenv.config();

const server = express();

const PORT = process.env.PORT ?? 3000;

const whitelist = [process.env.PROD === 'true' ? 'https://immoradar.onrender.com' : 'http://localhost:8080'];
const corsOptions: cors.CorsOptions = { origin: whitelist };

server.use(cors(corsOptions));
server.use(morgan('dev'));
server.use(helmet());
server.use(fileUpload());
server.use(express.json());

server.use('/realestate', realEstatesRouter);
server.use('/asset', assetRouter);
server.use('/image', imageRouter);
server.use('/user', userRouter);

server.get('/ok', (req, res) => res.status(200).end());

server.use(errorHandler);
server.use(notFoundHandler);

server.listen(PORT, () => {
  console.log(`\nServer listening on port ${PORT} in ${process.env.MODE} mode:`);
});
