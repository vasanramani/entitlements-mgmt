import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { RoleEntitlement } from './RoleEntitlement';
import { UserRole } from './UserRole';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => RoleEntitlement, roleEnt => roleEnt.role, { cascade: true, eager: true })
  roleEntitlements!: RoleEntitlement[];

  @OneToMany(() => UserRole, userRole => userRole.role, { cascade: true })
  userRoles!: UserRole[];
}
