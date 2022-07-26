import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({ ...createUserDto });
    return this.userRepository.save(user);
  }

  findAll(limit: number, offset: number, search?: string) {
    const options: FindManyOptions<User> = {
      select: ['userId', 'firstName', 'lastName', 'createAt'],
      take: limit,
      skip: offset,
    };

    if (search) {
      options.where = [
        { firstName: Like(`%${search}%`) },
        { lastName: Like(`%${search}%`) },
      ];
    }

    return this.userRepository.findAndCount(options);
  }

  findOne(userId: string) {
    return this.userRepository.findOne({
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        posts: {
          postId: true,
          title: true,
          createAt: true,
        },
        subscribers: {
          userId: true,
          firstName: true,
          lastName: true,
        },
      },
      relations: { posts: true, subscribers: true },
      where: { userId },
    });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ userId }, { ...updateUserDto });
    return this.findOne(userId);
  }

  remove(userId: string) {
    return this.userRepository.delete({ userId });
  }
}
