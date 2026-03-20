import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from './Role';
import { Entitlement } from './Entitlement';

@Entity('role_entitlements')
export class RoleEntitlement {
  @PrimaryColumn('uuid')
  role_id!: string;

  @PrimaryColumn('uuid')
  entitlement_id!: string;

  @ManyToOne(() => Role, role => role.roleEntitlements, { onDelete: 'CASCADE' })
  role!: Role;

  @ManyToOne(() => Entitlement, entitlement => entitlement.roleEntitlements, { onDelete: 'CASCADE' })
  entitlement!: Entitlement;
}
