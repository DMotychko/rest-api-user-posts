import {IUser, IUserCreateDto, IUserLoginDto, IUserResponseDto} from "../interfaces/user.interface";
import {userService} from "./user.service";
import {passwordService} from "./password.service";
import {userRepository} from "../repositories/user.repository";
import {ITokenPair, ITokenPayload} from "../interfaces/token.interface";
import {ApiError} from "../errors/api-error";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repositories/token.repository";


class AuthService {
    public async create (userDto: IUserCreateDto): Promise<{user: IUserResponseDto, tokens: ITokenPair}> {
        await userService.isEmailUnique(userDto.email)
        const password = await passwordService.hashPassword(userDto.password)
        const user: IUser = await userRepository.create({...userDto, password})

        const tokens = tokenService.generateToken({userId: user._id})
        await tokenRepository.create({...tokens, _userId: user._id})
        return {
            user,
            tokens
        }
    }

    public async login (userDto: IUserLoginDto): Promise<{user: IUserResponseDto, tokens: ITokenPair}> {
        const user = await userRepository.getByEmail(userDto.email)
        const isPasswordCorrect = await passwordService.comparePassword(
            userDto.password,
            user.password
        )
        if (!isPasswordCorrect) {
            throw new ApiError("Incorrect email or password", 401);
        }
        const tokens = tokenService.generateToken({userId: user._id})
        await tokenRepository.create({...tokens, _userId: user._id})
        return {
            user,
            tokens
        }
    }

    public async refresh (tokenPayload: ITokenPayload, refreshToken: string): Promise<ITokenPair> {
        await tokenRepository.deleteByParams({refreshToken})
        const tokens = tokenService.generateToken({userId: tokenPayload.userId})
        await tokenRepository.create({...tokens, _userId: tokenPayload.userId})
        return tokens
    }

    public async logout (refreshToken: string): Promise<void> {
        await tokenRepository.deleteByParams({refreshToken})
    }
}

export const authService = new AuthService();