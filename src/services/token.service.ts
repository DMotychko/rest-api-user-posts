// import * as jwt from 'jsonwebtoken'
// import {config} from "../configs/config";
// import {ITokenPair} from "../interfaces/token.interface";
//
// class TokenService {
//     public generateToken (payload: string): Promise<ITokenPair> {
//         const accessToken = jwt.sign(payload, config.jwtAccessSecret, {
//             expiresIn: config.jwtAccessExpiresIn
//         });
//         const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, {
//             expiresIn: config.jwtRefreshExpiresIn
//         })
//         return {
//             accessToken,
//             refreshToken
//         }
//     }
// }
//
// export const tokenService = new TokenService()