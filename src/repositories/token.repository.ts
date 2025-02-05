import {IToken, ITokenCreateDto} from "../interfaces/token.interface";
import {Token} from "../models/token.models";


class TokenRepository {
    public async create(dto: ITokenCreateDto): Promise<IToken> {
        return await Token.create(dto)
    }
}

export const tokenRepository = new TokenRepository()