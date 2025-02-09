import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import {tokenMiddleware} from "../middlewares/token.middleware";
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators/user.validator";

const router = Router();

router.post('/create', commonMiddleware.validateBody(UserValidator.create), authController.create )

router.post('/login', commonMiddleware.validateBody(UserValidator.login), authController.login)

router.get('/refresh', tokenMiddleware.checkRefreshToken, authController.refresh)

router.delete('/logout', tokenMiddleware.checkRefreshToken, authController.logout)

export const authRouter = router