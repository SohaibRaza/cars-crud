import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Users } from '../users/users.model';
import { Posts } from '../posts/posts.model';

export type CommentsDocument = Comments & mongoose.Document;

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'comments',
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Comments {
  @Prop({ required: true })
  content: string;

  @Prop({
    ref: 'Users',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  author: Users;

  @Prop({
    ref: 'Posts',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  post: Posts;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
