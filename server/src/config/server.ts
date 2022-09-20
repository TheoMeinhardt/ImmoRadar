import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

const PORT = process.env.PORT ?? 3000;

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.listen(PORT, () => {
  console.log(`\nServer listening on port ${PORT}`);
});
