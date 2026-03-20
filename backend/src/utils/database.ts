import { DataSource } from 'typeorm';
import path from 'path';
import { User, Role, Entitlement, UserRole, RoleEntitlement } from '../entities';

const databasePath = process.env.DATABASE_PATH || path.join(__dirname, '..', 'database.db');

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  entities: [User, Role, Entitlement, UserRole, RoleEntitlement],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  dropSchema: false,
});

export async function initializeDatabase() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database initialized successfully');

      // Seed default entitlements if they don't exist
      const entitlementRepository = AppDataSource.getRepository(Entitlement);
      const defaultEntitlements = [
        { name: 'read', description: 'Read access to resources' },
        { name: 'write', description: 'Write/Create access to resources' },
        { name: 'delete', description: 'Delete access to resources' },
        { name: 'manage_users', description: 'Manage users and roles' },
      ];

      for (const ent of defaultEntitlements) {
        const exists = await entitlementRepository.findOne({ where: { name: ent.name } });
        if (!exists) {
          await entitlementRepository.save(ent);
        }
      }
      console.log('Default entitlements seeded');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export function getRepository(entity: any) {
  return AppDataSource.getRepository(entity);
}
