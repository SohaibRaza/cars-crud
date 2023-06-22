import * as nodemailer from 'nodemailer';
import {
  Controller,
  Post,
  Body,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '~src/guards';
import { GetUser } from '~src/decorators/getUser.decorator';
import { Users } from '~modules/users/users.model';
import { Auth } from '~common/helpers/auth';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('me')
  @UseGuards(AuthGuard)
  async me(@GetUser() user: Users) {
    return user;
  }

  @Post('signup')
  async signup(
    @Body() { email, username }: CreateUserDto,
    @Response() res,
  ): Promise<string> {
    const user = await this.authService.signUp({ email, username });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    transporter.sendMail({
      from: 'Your App <your-email@gmail.com>',
      to: user.email,
      subject: 'Thank you for signing up!',
      text: `Hi ${user.username},\n\nWelcome! Your password for logging in is: ${user.password}`,
      html: `<p>Hi ${user.username},</p><p>Welcome! Your password for logging in is: <strong>${user.password}</strong></p>`,
    });

    return res.json(await Auth.formatAuthResponse(user));
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Response() res,
  ): Promise<string> {
    const user = await this.authService.login({ email, password });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return res.json(await Auth.formatAuthResponse(user));
  }
}
