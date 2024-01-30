import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { IS_PUBLIC_KEY } from '../common/decorators';
import { AuthCMD } from '../common/command/user.cmd';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly authService: ClientProxy,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    if (context.getType() !== 'http') {
      return false;
    }

     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader) return false;

    const authHeaderParts = (authHeader as string).split(' ');

    if (authHeaderParts.length !== 2) return false;

    const [, jwt] = authHeaderParts;

    return this.authService.send({ cmd: AuthCMD.VERIFY_JWT }, { jwt }).pipe(
      switchMap(( user ) => {
        if (!user.exp) return of(false);
        request['user'] = user;

        const TOKEN_EXP_MS = user.exp * 1000;

        const isJwtValid = Date.now() < TOKEN_EXP_MS;

        return of(isJwtValid);
      }),
      catchError(() => {
        throw new UnauthorizedException();
      }),
    );
  }
}