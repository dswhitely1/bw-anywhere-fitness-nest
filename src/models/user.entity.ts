import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(type => Role, role => role.user)
  roles: Role[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  checkPassword(password) {
    return bcrypt.hashSync(password, this.password);
  }
}
