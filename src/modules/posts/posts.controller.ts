import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Users } from '~modules/users/users.model';
import { GetUser } from '~src/decorators/getUser.decorator';
import { AuthGuard, PostOwnershipGuard } from '~src/guards';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPostDto: CreatePostDto, @GetUser() author: Users) {
    return this.postsService.create(createPostDto, author);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('author')
  @UseGuards(AuthGuard)
  findAllByAuthor(@GetUser() author: Users) {
    return this.postsService.findAllByAuthor(author);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, PostOwnershipGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, PostOwnershipGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
