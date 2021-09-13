import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    await this.userRepository.save(dto);
    return user;
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async update(id: number, dto: CreateUserDto) {
    await this.userRepository.update({ id }, dto);
    return await this.userRepository.findOne({ id });
  }

  async getUsersByParams(param: any): Promise<User[]> {
    return await this.userRepository.find(param);
  }

  async delete(id: number) {
    return this.userRepository.softDelete(id);
  }

  async restore(id: number) {
    return this.userRepository.restore(id);
  }
}
