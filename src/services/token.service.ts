import * as jwt from 'jsonwebtoken'
import {config} from "../configs/config";
import {ITokenPair} from "../interfaces/token.interface";
import {ApiError} from "../errors/api-error";

class TokenService {
    public generateToken (payload: {userId: string, email: string}): ITokenPair {
        try {
            const accessToken = jwt.sign(payload, config.jwtAccessSecret, {
                expiresIn: "15m"
            });
            const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, {
                expiresIn: "7d"
            })

            return {
                accessToken,
                refreshToken
            }
        } catch (e) {
            throw new ApiError(e.message, 500)
        }
    }
}

export const tokenService = new TokenService()