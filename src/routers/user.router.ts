import { Router } from "express"
import {tokenMiddleware} from "../middlewares/token.middleware";
import {userController} from "../controllers/user.controller";

const router = Router();

router.delete('/deleteMe', tokenMiddleware.checkAccessToken, userController.deleteMe)

router.patch('/updatedMe', tokenMiddleware.checkAccessToken, userController.updatedMe)

router.get("/", tokenMiddleware.checkAccessToken, userController.getList)

export const userRouter = router