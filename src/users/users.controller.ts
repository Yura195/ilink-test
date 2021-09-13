import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from './pipes/validation.pipe';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  /**
   * Запрос на добавление нового пользователя
   *
   * @param userDto объект списка полей пользователя
   * @return объект запроса-ответа
   */
  @ApiOperation({ summary: 'Create users' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      user,
    };
  }

  /**
   * Запрос на получение всех пользователей
   *
   * @return объект запроса-ответа
   */
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAllUsers() {
    const users = await this.userService.getAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    };
  }

  /**
   * Запрос на изменение пользователя
   *
   * @param id уникальный идентификатор
   * @param userDto объект списка полей пользователя
   * @return объект запроса-ответа
   */
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userDto: CreateUserDto) {
    const userUpdate = await this.userService.update(id, userDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      userUpdate,
    };
  }

  /**
   * Запрос на получение пользователя/пользователей по параметрам
   *
   * @param query параметры запроса
   * @return объект запроса-ответа
   */
  @ApiOperation({ summary: 'Get user by params' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('user?')
  async getUsersBy(@Query() query) {
    const users = await this.userService.getUsersByParams(query);
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    };
  }

  /**
   * Запрос на получение восстановленного пользователя
   *
   * @param id уникальный идентификатор
   * @return объект запроса-ответа
   */
  @ApiOperation({ summary: 'Restore user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get('restore/:id')
  async restoreUser(@Param('id') id: number) {
    const userRestore = await this.userService.restore(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User is restored',
      userRestore,
    };
  }

  /**
   * Запрос на удаление пользователя
   *
   * @param id уникальный идентификатор
   * @return объект запроса-ответа
   */
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const userDelete = this.userService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User is deleted',
      userDelete,
    };
  }
}
