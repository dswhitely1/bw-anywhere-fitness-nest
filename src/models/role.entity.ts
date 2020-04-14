import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToOne(type => User, user => user.roles)
  user: User
}
