import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const exceptionResponse = exception.getResponse();
    
    // Extract errors from response if it's an object
    const errors = typeof exceptionResponse === 'object' && exceptionResponse !== null
      ? { ...exceptionResponse }
      : {};

    // Remove message from errors if it exists (to avoid duplication)
    if ('message' in errors) {
      delete (errors as { message?: unknown }).message;
    }

    response.status(status).json({
      status,
      message,
      errors: Object.keys(errors).length > 0 ? errors : undefined,
    });
  }
}

