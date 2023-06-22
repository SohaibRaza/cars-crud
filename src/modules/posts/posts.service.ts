import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Users } from '~modules/users/users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Posts, PostsDocument } from './posts.model';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<PostsDocument>,
  ) {}

  async create(createPostDto: CreatePostDto, author: Users) {
    const post = await this.postModel.create({ ...createPostDto, author });
    return post;
  }

  async findAll() {
    return await this.postModel.find();
  }

  async findAllByAuthor(author: Users) {
    return await this.postModel.find({ author });
  }

  async findById(id: string) {
    const post = await this.postModel.findOne({ _id: id }).populate('author');

    if (!post) throw new NotFoundException();

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    await this.postModel.updateOne({ _id: id }, { ...updatePostDto });
    return true;
  }

  async remove(id: string) {
    return await this.postModel.deleteOne({ _id: id });
  }
}
