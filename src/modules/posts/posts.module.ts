import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsSchema } from './posts.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Posts', schema: PostsSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
