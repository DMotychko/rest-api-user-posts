import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post('/create', authController.create )

router.post('/login', authController.login)

export const authRouter = router