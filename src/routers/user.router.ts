import { Router } from "express"
import {tokenMiddleware} from "../middlewares/token.middleware";
import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators/user.validator";

const router = Router();

router.delete('/deleteMe', tokenMiddleware.checkAccessToken, userController.deleteMe)

router.patch('/updatedMe',
    tokenMiddleware.checkAccessToken,
    commonMiddleware.validateBody(UserValidator.update),
    userController.updatedMe
)

router.get("/getList", tokenMiddleware.checkAccessToken, userController.getList )

router.get("/getUser",
    tokenMiddleware.checkAccessToken,
    commonMiddleware.validateQuery(UserValidator.getUser),
    userController.getUser
)

router.get('/filterByName', commonMiddleware.validateQuery(UserValidator.filterByName), userController.filterByName)

export const userRouter = router