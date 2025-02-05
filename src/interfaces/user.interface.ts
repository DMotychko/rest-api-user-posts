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