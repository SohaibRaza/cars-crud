import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './users.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  async create({
    email,
    password,
    username,
  }: {
    email: string;
    username: string;
    password: any;
  }): Promise<Users> {
    try {
      const user = await this.userModel.create({ email, password, username });
      return user;
    } catch (error) {
      if (error?.code === 11000)
        throw new BadRequestException({ error: error.keyPattern });

      throw new InternalServerErrorException({
        message: 'something went wrong signing up',
      });
    }
  }

  async findByEmail(email: string): Promise<Users> {
    return this.userModel.findOne({ email });
  }

  async findWithPassword(email: string) {
    return this.userModel.findOne({ email }).select('+password');
  }

  async findAll(): Promise<Users[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<Users> {
    return await this.userModel.findById(id);
  }

  async update(id: string, user: Users): Promise<Users> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<Users> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
