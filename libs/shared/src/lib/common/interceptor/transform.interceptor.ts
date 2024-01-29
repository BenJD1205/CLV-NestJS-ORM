import { Reflector } from '@nestjs/core';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message?: string;
  data: T;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        console.log(data);
        return ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message:
          this.reflector.get<string>(
            'response_message',
            context.getHandler(),
          ) || '',
        data: data,
      })}),
    );
  }
}