import { Post } from '../../posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique('unique_user_names', ['firstName', 'lastName'])
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'NOW()' })
  updateAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @ManyToMany(() => User)
  /*
   * There is no option for Index name to be set
   * while @JoinTable is used to create associative (junction) table
   */
  @JoinTable({
    name: 'user_subscribers',
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'userId',
      foreignKeyConstraintName: 'fk_user_subscribers_user_id',
    },
    joinColumn: {
      name: 'subscriberId',
      referencedColumnName: 'userId',
      foreignKeyConstraintName: 'fk_user_subscribers_subscriber_id',
    },
  })
  subscribers: User[];
}
