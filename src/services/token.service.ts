import * as jwt from 'jsonwebtoken'
import {config} from "../configs/config";
import {ITokenPair, ITokenPayload} from "../interfaces/token.interface";
import {ApiError} from "../errors/api-error";

class TokenService {
    public generateToken (payload: ITokenPayload): ITokenPair {
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
    public verifyToken(token: string, type: "access" | "refresh"): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case "access":
                    secret = config.jwtAccessSecret;
                    break;
                case "refresh":
                    secret = config.jwtRefreshSecret;
                    break;
                default:
                    throw new ApiError("Invalid token type", 401);
            }

            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError("Invalid token", 401);
        }
    }
}

export const tokenService = new TokenService()