import {IToken, ITokenCreateDto} from "../interfaces/token.interface";
import {Token} from "../models/token.models";


class TokenRepository {
    public async create(dto: ITokenCreateDto): Promise<IToken> {
        return await Token.create(dto)
    }

    public async findByParams(params: Partial<IToken>): Promise<IToken> {
        return await Token.findOne(params)
    }
    public async deleteByParams(params: Partial<IToken>): Promise<void> {
        await Token.deleteOne(params)
    }
}

export const tokenRepository = new TokenRepository()