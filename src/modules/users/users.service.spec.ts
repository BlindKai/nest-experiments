import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOneOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

/**
 * @TODO move mocks and test subjects into a separate place
 * @TODO provide better description for the test cases
 * @TODO Make assumptions in different test cases
 */

const userDto: CreateUserDto = {
  firstName: 'John',
  lastName: 'Doe',
  isActive: true,
};

const testUser: User = {
  userId: 'a9ebfa92-42cc-4094-a1ce-2b86b985a510',
  firstName: 'John',
  lastName: 'Doe',
  isActive: true,
  createAt: new Date(),
  updateAt: new Date(),
  posts: [],
  subscribers: [],
};

const mockQueryBuilder: MockType<Partial<SelectQueryBuilder<User>>> = {
  leftJoin: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  addSelect: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  offset: jest.fn().mockReturnThis(),
  groupBy: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  orWhere: jest.fn().mockReturnThis(),
  getRawMany: jest.fn(),
  getCount: jest.fn(),
};

export const mockUsersRepository: MockType<Repository<User>> = {
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  create: jest.fn().mockResolvedValue(testUser),
  save: jest.fn().mockResolvedValue(testUser),
  createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
};

describe('Users Service', () => {
  let repo: UsersRepository;
  let mockRepository: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    repo = module.get(UsersRepository);
    mockRepository = module.get(getRepositoryToken(User));
  });

  describe('Add new user', () => {
    test('When all the required fields are passed the user is successfully created', async () => {
      jest.spyOn(repo, 'create');

      await expect(repo.create(userDto)).resolves.toEqual(testUser);

      expect(repo.create).toBeCalledTimes(1);

      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });

    test('Fails to create a user', async () => {
      const emptyUserDto = {} as CreateUserDto;
      const error = new Error('Not all required fields are provided');

      jest.spyOn(repo, 'create').mockRejectedValue(error);

      await expect(repo.create(emptyUserDto)).rejects.toBeInstanceOf(Error);

      expect(repo.create).toBeCalledTimes(1);
    });
  });

  describe('Find a single user', () => {
    test('When provided userId has a match return the user', async () => {
      jest.spyOn(repo, 'findOne');
      mockRepository.findOne.mockResolvedValue(testUser);

      const user = await repo.findOne(testUser.userId);

      expect(user).toEqual(testUser);
      expect(repo.findOne).toHaveBeenCalledWith(testUser.userId);

      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.findOne).toHaveBeenCalledWith(
        expect.objectContaining<FindOneOptions<User>>({
          where: { userId: testUser.userId },
        }),
      );
    });
  });

  describe('Find all users', () => {
    test('When no search filter is provided and a pagination is applied should return paginated users', async () => {
      jest.spyOn(repo, 'findAll');

      mockQueryBuilder.getRawMany.mockResolvedValue([testUser]);
      mockQueryBuilder.getCount.mockResolvedValue(1);

      const users = await repo.findAll(5, 0);

      expect(users).toEqual({ count: 1, items: [testUser] });
      expect(repo.findAll).toHaveBeenCalledWith(5, 0);

      expect(mockRepository.createQueryBuilder).toBeCalledTimes(1);
    });

    test('When search filter is provided and a pagination is applied should return paginated users by search', async () => {
      jest.spyOn(repo, 'findAll');

      mockQueryBuilder.getRawMany.mockResolvedValue([testUser]);
      mockQueryBuilder.getCount.mockResolvedValue(1);

      const users = await repo.findAll(5, 0, 'John');

      expect(users).toEqual({ count: 1, items: [testUser] });
      expect(repo.findAll).toHaveBeenCalledWith(5, 0, 'John');

      expect(mockRepository.createQueryBuilder).toBeCalledTimes(1);
      expect(mockQueryBuilder.where).toHaveBeenCalled();
      expect(mockQueryBuilder.orWhere).toHaveBeenCalled();
    });
  });

  test('When a valid userId is provided update user properties with given values', async () => {
    const updateAtDate = new Date();

    jest.spyOn(repo, 'update');
    jest.spyOn(repo, 'findOne').mockResolvedValue({
      ...testUser,
      updateAt: updateAtDate,
      firstName: 'Adam',
    });

    const updatedUser = await repo.update(testUser.userId, {
      firstName: 'Adam',
    });

    expect(repo.update).toBeCalled();
    expect(repo.findOne).toHaveBeenCalled();

    expect(mockRepository.update).toHaveBeenCalled();
    expect(mockRepository.update).toHaveBeenCalledWith(
      { userId: testUser.userId },
      { firstName: 'Adam' },
    );

    expect(updatedUser.firstName).toBe('Adam');
    expect(updatedUser.updateAt).toBe(updateAtDate);
  });

  test('When a valid userId is provided add a subscriber to a given user', async () => {
    jest.spyOn(repo, 'subscribe');
    jest.spyOn(repo, 'findOne').mockResolvedValue({
      ...testUser,
    });

    await repo.subscribe(
      testUser.userId,
      'a9ebfa92-42cc-4094-a1ce-2b86b985a510',
    );

    expect(repo.subscribe).toBeCalled();

    expect(mockRepository.findOne).toHaveBeenCalled();
    expect(mockRepository.update).toHaveBeenCalled();
    expect(mockRepository.update).toHaveBeenCalledWith(
      { userId: testUser.userId },
      {
        subscribers: [
          ...testUser.subscribers,
          { userId: 'a9ebfa92-42cc-4094-a1ce-2b86b985a510' },
        ],
      },
    );
  });

  test('When a valid userId is provided delete the user for that userId', async () => {
    jest.spyOn(repo, 'delete');

    await repo.delete(testUser.userId);

    expect(repo.delete).toBeCalled();
    expect(mockRepository.delete).toHaveBeenCalled();
    expect(mockRepository.delete).toHaveBeenCalledWith({
      userId: testUser.userId,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
