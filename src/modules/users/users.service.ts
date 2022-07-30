import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Like, Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
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

  async findAll(limit: number, offset: number, search?: string) {
    const query = this.userRepository
      .createQueryBuilder('users')
      .leftJoin(Post, 'posts', '"userId" = "author"')
      .select(['"userId"', '"firstName"', '"lastName"', 'users."createAt"'])
      .addSelect('COUNT(posts)::int', 'posts')
      .limit(limit)
      .offset(offset)
      .groupBy('"userId"');

    if (search) {
      query
        .where('"firstName" LIKE :firstName ', { firstName: `%${search}%` })
        .orWhere('"lastName" LIKE :lastName ', { lastName: `%${search}%` });
    }

    const [items, count] = await Promise.all([
      query.getRawMany(),
      query.getCount(),
    ]);

    return { items, count };
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

  async subscribe(subscriberId: string, userId: string) {
    await this.userRepository.update({ userId }, {});
  }

  remove(userId: string) {
    return this.userRepository.delete({ userId });
  }
}
