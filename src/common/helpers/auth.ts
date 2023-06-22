import * as jsonwebtoken from 'jsonwebtoken';
import { Users } from '../../modules/users/users.model';
import { env } from '../constants';
import { BadRequestException } from '@nestjs/common';

export class Auth {
  static EXPIRY_SECONDS: number = 60 * 60 * 24 * 7;
  static SECRET: jsonwebtoken.Secret = env.JWT_SECRET;

  static async decode(
    token: string,
  ): Promise<Record<any, any> | string | null> {
    try {
      return jsonwebtoken.verify(token, this.SECRET);
    } catch (error) {
      throw new BadRequestException({
        message: 'Invalid Token',
      });
    }
  }

  static async sign(attrs: Record<any, any>, opts?): Promise<string> {
    const expiry =
      attrs.exp || Math.floor(Date.now() / 1000) + this.EXPIRY_SECONDS;

    return jsonwebtoken.sign(
      {
        ...attrs,
        expiry,
      },
      this.SECRET,
      opts,
    );
  }

  static async generateToken(
    user: Record<any, any>,
    opts?: { exp: number /* number of seconds */ },
  ): Promise<string> {
    return this.sign({
      userId: user.id,
      ...(opts?.exp && { exp: opts.exp }),
    });
  }

  static async formatAuthResponse(
    user,
    opts: {
      jwtToken?: boolean;
    } = { jwtToken: true },
  ): Promise<{
    user: Users;
    jwtToken?: string;
  }> {
    const { jwtToken } = opts;
    const { password, ...rest } = user.toObject();

    const response = {
      user: rest,
      ...(jwtToken && {
        jwtToken: await this.sign({
          user: rest,
        }),
      }),
    };

    return response;
  }
}
