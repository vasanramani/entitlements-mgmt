import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';
import { Role } from './Role';

@Entity('user_roles')
export class UserRole {
  @PrimaryColumn('uuid')
  user_id!: string;

  @PrimaryColumn('uuid')
  role_id!: string;

  @ManyToOne(() => User, user => user.userRoles, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Role, role => role.userRoles, { onDelete: 'CASCADE' })
  role!: Role;
}
