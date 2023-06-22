import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Auth } from '../common/helpers/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const authToken = request.headers.authorization;
      if (!authToken) throw new ForbiddenException();

      const decoded = await Auth.decode(authToken);

      request.auth = decoded;

      return true;
    } catch (exception) {
      throw new UnauthorizedException(exception);
    }
  }
}
