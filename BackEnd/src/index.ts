import express from "express";
import { loadControllers } from "awilix-express";
import { loadContainer } from './container';
import { errorHandlerMiddleware } from './middlewares/errorhandlermiddleware';
import cors from 'cors';

import dotenv from "dotenv";

dotenv.config()


let app_port = process.env.APP_PORT ? process.env.APP_PORT : 3001; 

const app: express.Application = express();
app.use(express.json());
app.use(cors());
loadContainer(app);

app.use(loadControllers(
    './controllers/*.*s',
    { cwd: __dirname }
));

app.use(errorHandlerMiddleware);

app.listen(app_port, () => {
    console.log(`Server is running on port ${app_port}`);
});