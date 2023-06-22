import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.model';
import bcrypt from '~common/helpers/bcrypt';
import { CreateUserDto, LoginDto, BaseDto } from './dto/auth.dto';
import { generatePassword } from '~common/helpers/generatePassword';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(params: CreateUserDto): Promise<Users> {
    const { username, email } = params;

    const isExisting = await this.usersService.findByEmail(email);

    if (isExisting)
      throw new BadRequestException('This account is already in use.');

    const password = generatePassword(12);
    const attrs = {
      email,
      username: username.toLowerCase(),
      password: await bcrypt.hash(password),
    };

    const user = await this.usersService.create(attrs);

    return user;
  }

  async login(params: LoginDto): Promise<any> {
    const { email, password } = params;
    const user = await this.usersService.findWithPassword(email);

    if (!user) throw new BadRequestException('Incorrect Credentials');

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) throw new BadRequestException('Incorrect Credentials');

    return user;
  }

  // async forgotPassword(params: BaseDto): Promise<Users | null> {
  //   try {
  //     const { email } = params;

  //     const user = await this.usersService.findOne({ email });

  //     if (user) {
  //       user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  //       user.resetPasswordExpiry = dayjs().add(1, 'h').toDate();
  //       await user.save();
  //       return user;
  //     }
  //   } catch (error) {
  //     errorReporter.notify(error);
  //     return null;
  //   }
  // }
}
