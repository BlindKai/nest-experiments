import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1658579487221 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          { name: 'userId', type: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'firstName', type: 'varchar' },
          { name: 'lastName', type: 'varchar' },
          { name: 'isActive', type: 'boolean' },
          { name: 'createAt', type: 'timestamptz', default: 'now()' },
          {
            name: 'updateAt',
            type: 'timestamptz',
            default: 'now()',
            onUpdate: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user', true);
  }
}
