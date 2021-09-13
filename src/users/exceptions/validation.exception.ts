import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Получение сообщения об ошибке
 */
export class ValidationException extends HttpException {
  messages;

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST);
    this.message = response;
  }
}
