import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserSubscribersTable1658771385595
  implements MigrationInterface
{
  name = 'CreateUserSubscribersTable1658771385595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_subscribers',
        columns: [
          { name: 'userId', type: 'uuid', isNullable: false, isPrimary: true },
          {
            name: 'subscriberId',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
        ],
        /* 
         * There is a problem with migration generation and indexes name for @JoinTable
         * If index contains name - the generated migration will drop this index and 
         * create a new index with IDX_<generated> value instead.
         * 
         * @TODO: look for a possible solution later
         */
        indices: [
          {
            // name: 'idx_user_subscribers_users',
            columnNames: ['userId'],
          },
          {
            // name: 'idx_user_subscribers_subscribers',
            columnNames: ['subscriberId'],
          },
        ],
        foreignKeys: [
          {
            name: 'fk_user_subscribers_user_id',
            referencedTableName: 'users',
            columnNames: ['userId'],
            referencedColumnNames: ['userId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_user_subscribers_subscriber_id',
            referencedTableName: 'users',
            columnNames: ['subscriberId'],
            referencedColumnNames: ['userId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_subscribers', true, true, true);
  }
}
