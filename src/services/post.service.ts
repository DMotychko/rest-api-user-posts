import {ITokenPayload} from "../interfaces/token.interface";
import {IPost, IPostCreateBody, IPostCreateDto, IPostUpdateBody} from "../interfaces/post.interface";
import {postRepository} from "../repositories/post.repository";
import {ApiError} from "../errors/api-error";

class PostService {
    public async create (tokenPayload: ITokenPayload, dto: IPostCreateBody): Promise<IPost> {
        const dtoForCreate: IPostCreateDto = {
            _userId: tokenPayload.userId,
            ...dto
        }
        return await postRepository.create(dtoForCreate)
    }

    public async getUserPosts(_userId: string): Promise<IPost[]> {
        return await postRepository.getUserPosts(_userId)
    }

    public async delete (postId: string, tokenPayload: ITokenPayload): Promise<void> {
        const post = await postRepository.getPostById(postId)
        if(!post) {
            throw new ApiError("Post not found", 404)
        }
        if(post._userId.toString() !== tokenPayload.userId) {
            throw new ApiError("You are not authorized to delete this post", 403)
        }
        await postRepository.deleteById(postId)
    }

    public async updated (postId: string, tokenPayload: ITokenPayload, dto: IPostUpdateBody): Promise<IPost> {
        const post = await postRepository.getPostById(postId)
        if(!post) {
            throw new ApiError("Post not found", 404)
        }
        if(post._userId.toString() !== tokenPayload.userId) {
            throw new ApiError("You are not authorized to delete this post", 403)
        }
        return await postRepository.updatedById(postId, dto)
    }
}

export const postService = new PostService()