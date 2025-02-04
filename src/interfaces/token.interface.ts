export interface IToken {
    _id: string,
    _userId: string,
    accessToken: string,
    refreshToken: string,
    createdAt: Date,
    updatedAt: Date
}

export interface ITokenPair extends Pick<IToken, "accessToken" | "refreshToken"> {}