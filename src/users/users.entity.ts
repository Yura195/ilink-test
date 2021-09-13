import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Объект базы данных пользователя
 */
@Entity({ name: 'user' })
export class User {
  @ApiProperty({example:'1',description:'unique identificator'})
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({example:'Yura',description:'username'})
  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @ApiProperty({example:'qwerty11',description:'user password'})
  @Column({ type: 'varchar', length: 150 })
  password!: string;

  @ApiProperty({example:'newuser11@mail.ru',description:'user email'})
  @Column({ unique: true })
  email!: string;

  @ApiProperty({example:'2021-09-13T05:29:08.057Z',description:'create date new user'})
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({example:'null',description:'delete date user'})
  @DeleteDateColumn()
  deletedAt?: Date;
}
