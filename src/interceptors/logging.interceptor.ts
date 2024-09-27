import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LoggerService } from '@/app/config/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { randomUUID } from 'node:crypto';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestId = randomUUID();

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { headers } = request;

    headers['x-request-id'] = requestId;

    this.logger.http(request, response, context.getClass().name);

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        response.setHeader('x-request-id', requestId);
      }),
    );
  }
}
