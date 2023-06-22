import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from 'src/modules/posts/posts.model';

@Injectable()
export class PostOwnershipGuard implements CanActivate {
  constructor(@InjectModel('Posts') private postsModel: Model<Posts>) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const post = await this.postsModel.findOne({
      _id: request.params?.id,
    });

    if (!post) throw new NotFoundException('No Post Found');

    if (post.author.toString() === request.auth?.user?._id) {
      request.post = post;
      return true;
    }

    return false;
  }
}
