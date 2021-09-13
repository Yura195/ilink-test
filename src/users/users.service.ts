import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Создание пользователя
   *
   * @param dto список полей пользователя
   * @return  список полей созданного пользователя
   */
  async create(dto: CreateUserDto): Promise<CreateUserDto & User> {
    const user = this.userRepository.create(dto);
    await this.userRepository.save(dto);
    return user;
  }

  /**
   * Получение списка всех пользователей
   *
   * @return  список найденных пользователей
   */
  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Изменение значения полей пользователя
   *
   * @param id уникальный идентификатор пользователя
   * @param dto список полей пользователя
   * @return  список полей найденного пользователя
   */
  async update(id: number, dto: CreateUserDto) {
    await this.userRepository.update({ id }, dto);
    return await this.userRepository.findOne({ id });
  }

  /**
   * Поиск пользователя/пользователя по нескольким параметрам
   *
   * @param param параметры поиска
   * @return  список пользователя/пользователей
   */
  async getUsersByParams(param: any): Promise<User[]> {
    return await this.userRepository.find(param);
  }

  /**
   * Удаление пользователя
   *
   * @param id уникальный идентификатор пользователя
   * @return  удаленный пользователь
   */
  async delete(id: number): Promise<UpdateResult> {
    return this.userRepository.softDelete(id);
  }

  /**
   * Восстановление пользователя
   *
   * @param id уникальный идентификатор пользователя
   * @return восстановленный пользователь
   */
  async restore(id: number): Promise<DeleteResult> {
    return this.userRepository.restore(id);
  }
}
