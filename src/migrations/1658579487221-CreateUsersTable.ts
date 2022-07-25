import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1658579487221 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'userId',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'firstName', type: 'varchar' },
          { name: 'lastName', type: 'varchar' },
          { name: 'isActive', type: 'boolean', default: true },
          { name: 'createAt', type: 'timestamptz', default: 'NOW()' },
          {
            name: 'updateAt',
            type: 'timestamptz',
            default: 'NOW()',
            onUpdate: 'NOW()',
          },
        ],
        uniques: [
          { columnNames: ['firstName', 'lastName'], name: 'unique_user_names' },
        ],
      }),
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true, true, true);
  }
}
