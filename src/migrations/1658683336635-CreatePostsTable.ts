import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePostsTable1658683336635 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'posts',
        columns: [
          {
            name: 'postId',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'author',
            type: 'uuid',
            isNullable: false,
            foreignKeyConstraintName: 'fk_posts_author',
          },
          { name: 'title', type: 'varchar' },
          { name: 'body', type: 'text' },
          { name: 'createAt', type: 'timestamptz', default: 'NOW()' },
          {
            name: 'updateAt',
            type: 'timestamptz',
            default: 'NOW()',
            onUpdate: 'NOW()',
          },
        ],
        uniques: [{ columnNames: ['title'], name: 'unique_post_titles' }],
      }),
      true,
      true,
      true,
    );

    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        name: 'fk_posts_author',
        columnNames: ['author'],
        referencedTableName: 'users',
        referencedColumnNames: ['userId'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts', true, true, true);
  }
}
