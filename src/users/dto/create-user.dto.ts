import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

/**
 * Список полей пользователя
 */
export class CreateUserDto {
  @ApiProperty({ example: 'Yura', description: 'username' })
  readonly name: string;

  @ApiProperty({ example: 'qwerty11', description: 'user password' })
  @Length(4, 100, { message: 'Password must be at least 4 digits' })
  readonly password: string;

  @ApiProperty({ example: 'newuser11@mail.ru', description: 'user email' })
  @IsEmail({}, { message: 'Email is incorrect' })
  readonly email: string;
}
