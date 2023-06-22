import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from '~common/helpers/auth';

export const GetUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    try {
      const request = ctx.switchToHttp().getRequest();
      const authToken = request.headers.authorization;
      if (!authToken) return null;
      const decoded = await Auth.decode(authToken);
      return (decoded as Record<any, any>)?.user;
    } catch (error) {
      // errorReporter.notify(error)
      return null;
    }
  },
);
