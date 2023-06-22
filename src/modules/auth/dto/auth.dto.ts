import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
  IsLowercase,
} from 'class-validator';
import * as mongoose from 'mongoose';

export class BaseDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}

export class Password {
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class CreateUserDto extends BaseDto {
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty()
  username: string;
}

export class SetUsernameDto {
  @ApiProperty()
  id: mongoose.Schema.Types.ObjectId;

  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty()
  newUsername: string;
}

export class LoginDto extends BaseDto {
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class ResetPasswordDto extends Password {
  @IsNotEmpty()
  token: string;
}

export class TokenDto {
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}

export class UsernameDto {
  @IsNotEmpty()
  @IsLowercase()
  @ApiProperty()
  username: string;
}
