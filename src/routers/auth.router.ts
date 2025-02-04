import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post('/create', authController.create )

export const authRouter = router