import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '~src/guards';
import { GetUser } from '~src/decorators/getUser.decorator';
import { Users } from '~modules/users/users.model';
import { CommentOwnershipGuard } from '~src/guards/commentOwnershipp.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // @Post()
  // create(@Body() createCommentDto: CreateCommentDto) {
  //   return this.commentsService.create(createCommentDto);
  // }

  @Post(':postId')
  @UseGuards(AuthGuard)
  addCommentOnPost(
    @Param('postId') postId: string,
    @Body() addCommentDto: CreateCommentDto,
    @GetUser() user: Users,
  ) {
    return this.commentsService.create(addCommentDto, postId, user);
  }

  @Get('post/:postId')
  findAllPostComments(@Param('postId') postId: string) {
    return this.commentsService.findAllPostComments(postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, CommentOwnershipGuard)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    console.log('<<<<<<first>>>>>>');
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, CommentOwnershipGuard)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
