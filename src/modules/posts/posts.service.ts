import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create({
      title: createPostDto.title,
      body: createPostDto.body,
      author: { userId: createPostDto.author },
    });
    return this.postRepository.save(post);
  }

  findAll(limit: number, offset: number, search?: string) {
    const options: FindManyOptions<Post> = {
      select: {
        postId: true,
        title: true,
        author: {
          firstName: true,
          lastName: true,
        },
      },
      relations: { author: true },
      take: limit,
      skip: offset,
    };

    if (search) {
      options.where = { title: Like(`%${search}%`) };
    }

    return this.postRepository.find(options);
  }

  findOne(postId: number) {
    return this.postRepository.findOne({
      relations: {
        author: true,
      },
      where: { postId },
    });
  }

  async update(postId: number, updatePostDto: UpdatePostDto) {
    await this.postRepository.update(
      { postId },
      {
        title: updatePostDto.title,
        body: updatePostDto.body,
        author: {
          userId: updatePostDto.author,
        },
      },
    );
    return this.findOne(postId);
  }

  remove(postId: number) {
    return this.postRepository.delete({ postId });
  }
}
