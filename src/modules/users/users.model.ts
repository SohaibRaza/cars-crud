import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'users' })
export class Users {
  _id: string;

  @Prop({ required: true, trim: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  // @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Post' }] })
  // posts: Posts[];

  // @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] })
  // comments: Comments[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
