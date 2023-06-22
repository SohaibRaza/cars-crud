import * as morgan from 'morgan';

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Users, UsersSchema } from './modules/users/users.model';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { UsersService } from './modules/users/users.service';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PostsModule,
    CommentsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morgan('dev')).forRoutes('*');
  }
}
