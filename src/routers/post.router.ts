import { Router } from "express";
import {tokenMiddleware} from "../middlewares/token.middleware";
import {postController} from "../controllers/post.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {PostValidator} from "../validators/post.validator";

const router = Router();

router.get('/userPosts/:userId', commonMiddleware.isIdValid('userId'), postController.getUserPosts)

router.post('/create', tokenMiddleware.checkAccessToken, commonMiddleware.validateBody(PostValidator.create), postController.create)

router.delete('/delete/:postId', commonMiddleware.isIdValid('postId'), tokenMiddleware.checkAccessToken, postController.delete)

router.patch('/updated/:postId',
    commonMiddleware.isIdValid('postId'),
    tokenMiddleware.checkAccessToken,
    commonMiddleware.validateBody(PostValidator.update),
    postController.updated
)

export const postRouter = router