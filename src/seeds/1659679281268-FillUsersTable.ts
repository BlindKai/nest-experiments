import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';

export class FillUsersTable1659679281268 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.getRepository(User).insert([
      {
        userId: 'a9ebfa92-42cc-4094-a1ce-2b86b985a510',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
      },
      {
        userId: '153a64d3-dea0-4e33-8d62-508211b92e22',
        firstName: 'Alan',
        lastName: 'Wake',
        isActive: false,
      },
      {
        userId: '0268a50a-17b6-4870-92b6-26b627a0d222',
        firstName: 'Bettie',
        lastName: 'Johnson',
        isActive: true,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.getRepository(User).clear();
  }
}
