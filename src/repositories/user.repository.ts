import {IUser, IUserCreateDto, IUserUpdatedDto} from "../interfaces/user.interface";
import {User} from "../models/user.model";


class UserRepository {
    public async getByEmail (email: string): Promise<IUser> {
        return await User.findOne({ email });
    }

    public async create(dto: IUserCreateDto): Promise<IUser> {
        return await User.create(dto)
    }

    public async getById(userId: string): Promise<IUser> {
        return await User.findById(userId);
    }

    public async deleteById(userId: string): Promise<void> {
        await User.deleteOne({ _id: userId });
    }

    public async updatedById(userId: string, dto: IUserUpdatedDto): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, dto, {new: true})
    }

    public async getList(): Promise<IUser[]> {
        return await User.find()
    }

}

export const userRepository = new UserRepository();