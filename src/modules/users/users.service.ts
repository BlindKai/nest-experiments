import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findAll(limit: number, offset: number, search?: string) {
    return this.userRepository.findAll(limit, offset, search);
  }

  findOne(userId: string) {
    this.userRepository.findOne(userId);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(userId, updateUserDto);
  }

  async subscribe(subscriberId: string, userId: string) {
    return this.userRepository.subscribe(subscriberId, userId);
  }

  remove(userId: string) {
    return this.userRepository.delete(userId);
  }
}
