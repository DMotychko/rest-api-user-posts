import {NextFunction, Request, Response} from "express";
import {IUserCreateDto, IUserLoginDto} from "../interfaces/user.interface";
import {authService} from "../services/auth.service";
import {ITokenPayload} from "../interfaces/token.interface";

class AuthController {
    public async create (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userDto = req.body as IUserCreateDto
            const result = await authService.create(userDto)
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    public async login (req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                const userDto = req.body as IUserLoginDto
                const result = await authService.login(userDto)
                res.status(200).json(result)
            } catch (e) {
                next(e)
            }
    }

    public async refresh (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tokenPayload = res.locals.tokenPayload as ITokenPayload
            const refreshToken = res.locals.refreshToken as string
            const result = await authService.refresh(tokenPayload, refreshToken)
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

}

export const authController = new AuthController()