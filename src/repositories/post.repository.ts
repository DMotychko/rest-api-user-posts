import {IPost, IPostCreateDto, IPostUpdateBody} from "../interfaces/post.interface";
import {Post} from "../models/post.model";


class PostRepository {
    public async create(dto: IPostCreateDto): Promise<IPost> {
        return await Post.create(dto)
    }

    public async getUserPosts(_userId: string): Promise<IPost[]> {
        return await Post.find({_userId})
    }

    public async getPostById(_id: string): Promise<IPost> {
        return await Post.findById(_id)
    }

    public async deleteById(_id: string): Promise<IPost> {
        return await Post.findByIdAndDelete(_id)
    }

    public async updatedById(_id: string, dto: IPostUpdateBody): Promise<IPost> {
        return await Post.findByIdAndUpdate(_id, dto, {new: true})
    }
}

export const postRepository = new PostRepository()