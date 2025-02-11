import express, {NextFunction, Request, Response} from "express"
import swaggerUi from "swagger-ui-express"
import cors from 'cors'
import {ApiError} from "./errors/api-error";
import {config} from "./configs/config";
import mongoose from "mongoose";
import {authRouter} from "./routers/auth.router";
import {userRouter} from "./routers/user.router";
import {postRouter} from "./routers/post.router";
import swaggerDocument from '../docs/swagger.json'



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter )
app.use('/users', userRouter)
app.use('/posts', postRouter)

const SERVER_URL = process.env.SERVER_URL || "localhost:3000";

swaggerDocument.host = SERVER_URL
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

app.use('*', (error: ApiError,req: Request, res: Response, next: NextFunction) => {
    const status = error.status ?? 500
    const message = error.message ?? "Something went wrong"

    res.status(status).json({status, message})
})

app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS"
}));

process.on('uncaughtException', (error: Error) => {
    console.error("Uncaught Exception: ", error);
    process.exit(1);
})

app.listen(config.port, async () => {
    await mongoose.connect(config.mongoUri)
    console.log(`Server has been started on port ${config.port}`)
})