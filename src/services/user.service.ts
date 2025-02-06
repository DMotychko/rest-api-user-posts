import {ApiError} from "../errors/api-error";
import {userRepository} from "../repositories/user.repository";
import {ITokenPayload} from "../interfaces/token.interface";
import { IUserForList, IUserResponseDto, IUserUpdatedDto} from "../interfaces/user.interface";


class UserService {
    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email)
        if(user) {
            throw new ApiError("Email is already in use", 409)
        }
    }
    public async deleteMe(dto: ITokenPayload): Promise<void> {
        const user = await userRepository.getById(dto.userId)
        if(!user) {
            throw new ApiError("User not found", 404)
        }
        await userRepository.deleteById(dto.userId)
    }

    public async updatedMe(tokenPayload: ITokenPayload, dto: IUserUpdatedDto): Promise<IUserResponseDto> {
        const user = await userRepository.getById(tokenPayload.userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        return await userRepository.updatedById(user._id, dto);
    }

    public async getList(): Promise<IUserForList[]> {
        const user = await userRepository.getList()
        return user.map(user => (
            {name: user.name, email: user.email, _id: user._id}
        ))
    }
}

export const userService = new UserService();