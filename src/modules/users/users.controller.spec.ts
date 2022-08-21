import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUserService: MockType<UsersService> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
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

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    test('create', async () => {
      const userDto = {
        firstName: 'John',
        lastName: 'doe',
        isActive: true,
      };

      jest.spyOn(userService, 'create').mockResolvedValue({
        userId: '1234-1234-1234-1234',
        firstName: 'John',
        lastName: 'doe',
        isActive: true,
        createAt: new Date(),
        updateAt: new Date(),
        posts: [],
        subscribers: [],
      });

      const user = await controller.create(userDto);

      expect(userService.create).toHaveBeenCalled();
      expect(userService.create).toHaveBeenCalledWith(userDto);

      expect(user).toMatchObject(userDto);
    });
  });

  describe('findAll', () => {
    test('findAll', async () => {
      jest.spyOn(controller, 'findAll');

      await controller.findAll({ page: 1, pageSize: 5 });

      expect(controller.findAll).toBeCalled();
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    test('findOne', async () => {
      jest.spyOn(controller, 'findOne');

      await controller.findOne(testUser.userId);

      expect(controller.findOne).toBeCalled();
      expect(userService.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    test('update', async () => {
      jest.spyOn(controller, 'update');

      await controller.update(testUser.userId, { firstName: 'Alan' });

      expect(controller.update).toBeCalled();
      expect(userService.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    test('remove', async () => {
      jest.spyOn(controller, 'remove');

      await controller.remove(testUser.userId);

      expect(controller.remove).toBeCalled();
      expect(userService.remove).toHaveBeenCalled();
    });
  });
});
