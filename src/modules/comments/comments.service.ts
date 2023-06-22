import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model } from 'mongoose';
import { Comments, CommentsDocument } from './comments.model';
import { Users } from '~modules/users/users.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<CommentsDocument>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    postId: string,
    author: Users,
  ) {
    const comment = await this.commentsModel.create({
      ...createCommentDto,
      post: postId,
      author,
    });
    return await comment.populate('author');
  }

  async findAllPostComments(postId: string) {
    return await this.commentsModel.find({ post: postId }).populate('author');
  }

  async findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return await this.commentsModel.updateOne(
      { _id: id },
      { ...updateCommentDto },
    );
  }

  async remove(id: string) {
    return await this.commentsModel.deleteOne({ _id: id });
  }
}
