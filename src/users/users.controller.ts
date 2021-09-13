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
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from './pipes/validation.pipe';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

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

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    };
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userDto: CreateUserDto) {
    await this.userService.update(id, userDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }

  @Get('user')
  async getUsersBy(@Query() query) {
    const users = await this.userService.getUsersByParams(query);
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    };
  }

  @Get('restore/:id')
  async restoreUser(@Param('id') id: number) {
    const userRestore = await this.userService.restore(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User is restored',
      userRestore,
    };
  }

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
