export interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string
}

export interface IUserCreateDto extends Pick<IUser, "name" | "email" | "password"> {}

export interface IUserResponseDto extends Pick<IUser, "name" | "email"> {}

export interface IUserLoginDto extends Pick<IUser, "email" | "password"> {}

export interface IUserUpdatedDto extends Pick<IUser, "name"> {}

export interface IUserForList extends Pick<IUser, "name" | "_id" | "email"> {}
