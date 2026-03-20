import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { RoleEntitlement } from './RoleEntitlement';

@Entity('entitlements')
export class Entitlement {
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

  @OneToMany(() => RoleEntitlement, roleEnt => roleEnt.entitlement, { cascade: true })
  roleEntitlements!: RoleEntitlement[];
}
