import {ApiError} from "../errors/api-error";
import {userRepository} from "../repositories/user.repository";


class UserService {
    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email)
        if(user) {
            throw new ApiError("Email is already in use", 409)
        }
    }
}

export const userService = new UserService();