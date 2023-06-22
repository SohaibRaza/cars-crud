import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Users } from '../users/users.model';

export type PostsDocument = Posts & mongoose.Document;

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'posts',
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Posts {
  readonly id: string;

  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({
    ref: 'Users',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  })
  author: Users;

  //   @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] })
  //   comments: Comment[];
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
