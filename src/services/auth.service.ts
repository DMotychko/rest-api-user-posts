import {IUser, IUserCreateDto, IUserResponseDto} from "../interfaces/user.interface";
import {userService} from "./user.service";
import {passwordService} from "./password.service";
import {userRepository} from "../repositories/user.repository";


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
}

export const authService = new AuthService();