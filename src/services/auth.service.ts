import {IUser, IUserCreateDto, IUserLoginDto, IUserResponseDto} from "../interfaces/user.interface";
import {userService} from "./user.service";
import {passwordService} from "./password.service";
import {userRepository} from "../repositories/user.repository";
import {ITokenPair} from "../interfaces/token.interface";
import {ApiError} from "../errors/api-error";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repositories/token.repository";


class AuthService {
    public async create (userDto: IUserCreateDto): Promise<IUserResponseDto> {
        await userService.isEmailUnique(userDto.email)
        const password = await passwordService.hashPassword(userDto.password)
        const user: IUser = await userRepository.create({...userDto, password})

        return {
            name: user.name,
            email: user.email
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
        const tokens = tokenService.generateToken({userId: user._id, email: user.email})
        await tokenRepository.create({...tokens, _userId: user._id})
        return {
            user: {
                name: user.name,
                email: user.email
            },
            tokens: tokens
        }
    }
}

export const authService = new AuthService();