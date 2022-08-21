import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.repository.create({ ...createUserDto });
    return this.repository.save(user);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    await this.repository.update({ userId }, { ...updateUserDto });
    return this.findOne(userId);
  }

  async findAll(limit: number, offset: number, search?: string) {
    const query = this.repository
      .createQueryBuilder('users')
      .leftJoin(Post, 'posts', 'users."userId" = posts."author"')
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
    return this.repository.findOne({
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

  delete(userId: string) {
    return this.repository.delete({ userId });
  }

  async subscribe(subscriberId: string, userId: string) {
    const user = await this.repository.findOne({
      where: { userId },
      relations: { subscribers: true },
    });
    await this.repository.update(
      { userId },
      { subscribers: [...user.subscribers, { userId: subscriberId }] },
    );
  }
}
