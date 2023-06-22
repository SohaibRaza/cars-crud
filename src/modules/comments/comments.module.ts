import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsSchema } from './comments.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comments', schema: CommentsSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
