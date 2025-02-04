import {IUser, IUserCreateDto} from "../interfaces/user.interface";
import {User} from "../models/user.model";


class UserRepository {
    public async getByEmail (email: string): Promise<IUser> {
        return await User.findOne({ email });
    }

    public async create(dto: IUserCreateDto): Promise<IUser> {
        return await User.create(dto)
    }
}

export const userRepository = new UserRepository();