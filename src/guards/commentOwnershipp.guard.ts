import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from '~modules/comments/comments.model';

@Injectable()
export class CommentOwnershipGuard implements CanActivate {
  constructor(
    @InjectModel('Comments') private commentsModel: Model<Comments>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const comment = await this.commentsModel.findOne({
      _id: request.params?.id,
    });

    if (!comment) throw new NotFoundException('No Post Found');

    if (comment.author.toString() === request.auth?.user?._id) {
      request.comment = comment;
      return true;
    }

    return false;
  }
}
