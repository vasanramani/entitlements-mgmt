# Entitlements Management System

A full-stack application for managing fine-grained user entitlements, roles, and permissions. Built with Angular (frontend) and Node.js/Express (backend) with SQLite database.

## Features

- **User Management**: Create, read, update, delete users with role assignments
- **Role Management**: Create custom roles and assign multiple entitlements to each role
- **Entitlements**: Manage fine-grained permissions (read, write, delete, manage_users)
- **Role-Based Assignment**: Assign multiple roles to users and entitlements to roles
- **Dashboard**: Overview statistics for users, roles, and entitlements
- **REST API**: Complete REST API for all operations
- **SQLite Database**: Lightweight, file-based database for persistence

## Project Structure

```
entitlements-mgmt/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── entities/          # TypeORM database entities
│   │   ├── controllers/       # API request handlers
│   │   ├── services/          # Business logic
│   │   ├── routes/            # API route definitions
│   │   ├── utils/             # Utilities, validators, errors
│   │   ├── app.ts             # Express app setup
│   │   └── index.ts           # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example           # Environment variables template
├── frontend/                   # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/          # Services, interceptors
│   │   │   ├── shared/        # Models, shared components
│   │   │   ├── features/      # Feature modules (users, roles, entitlements, dashboard)
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   │   └── app.routing.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.scss
│   ├── package.json
│   ├── angular.json
│   ├── tsconfig.json
│   └── proxy.conf.json
└── package.json               # Root package for managing both projects

```

## Prerequisites

- Node.js 18+ and npm
- Angular CLI (globally installed)
- SQLite3

## Installation

### 1. Install Dependencies

From the root directory (`entitlements-mgmt`):

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

Or use the convenience script:

```bash
npm run install-all
```

### 2. Configure Environment

Create a `.env` file in the `backend/` directory:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` as needed:

```
NODE_ENV=development
PORT=3000
DATABASE_PATH=./database.db
CORS_ORIGIN=http://localhost:4200
```

## Running the Application

### Option 1: Run Both Frontend and Backend (Recommended)

From the root directory:

```bash
npm run dev
```

This will start both the backend (port 3000) and frontend (port 4200) concurrently.

### Option 2: Run Separately

**Backend:**

```bash
cd backend
npm run dev
```

Backend will start on `http://localhost:3000`

**Frontend** (in a new terminal):

```bash
cd frontend
npm run dev
```

Frontend will start on `http://localhost:4200`

## API Endpoints

### Users

- `GET /api/users` - List all users
- `POST /api/users` - Create user
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/:id/roles` - Add role to user
  ```json
  { "roleId": "role-uuid" }
  ```
- `DELETE /api/users/:id/roles/:roleId` - Remove role from user

### Roles

- `GET /api/roles` - List all roles
- `POST /api/roles` - Create role
  ```json
  {
    "name": "admin",
    "description": "Administrator role"
  }
  ```
- `GET /api/roles/:id` - Get role details
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Delete role
- `POST /api/roles/:id/entitlements` - Add entitlement to role
  ```json
  { "entitlementId": "entitlement-uuid" }
  ```
- `DELETE /api/roles/:id/entitlements/:entitlementId` - Remove entitlement from role

### Entitlements

- `GET /api/entitlements` - List all entitlements
- `POST /api/entitlements` - Create entitlement
  ```json
  {
    "name": "write",
    "description": "Write/Create access to resources"
  }
  ```
- `GET /api/entitlements/:id` - Get entitlement details
- `PUT /api/entitlements/:id` - Update entitlement
- `DELETE /api/entitlements/:id` - Delete entitlement

### Health Check

- `GET /api/health` - Health check endpoint

## Default Entitlements

The system automatically seeds the following entitlements on first run:

- `read` - Read access to resources
- `write` - Write/Create access to resources
- `delete` - Delete access to resources
- `manage_users` - Manage users and roles

## Usage Example

### 1. Create Entitlements (Auto-seeded, but you can add more)

```bash
curl -X POST http://localhost:3000/api/entitlements \
  -H "Content-Type: application/json" \
  -d '{"name":"export","description":"Export data"}'
```

### 2. Create Roles

```bash
curl -X POST http://localhost:3000/api/roles \
  -H "Content-Type: application/json" \
  -d '{"name":"editor","description":"Editor role"}'
```

### 3. Add Entitlements to Role

```bash
# Get the role and entitlement IDs first
curl http://localhost:3000/api/roles
curl http://localhost:3000/api/entitlements

# Then add entitlement to role
curl -X POST http://localhost:3000/api/roles/{roleId}/entitlements \
  -H "Content-Type: application/json" \
  -d '{"entitlementId":"{entitlementId}"}'
```

### 4. Create User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username":"alice",
    "email":"alice@example.com",
    "password":"password123"
  }'
```

### 5. Assign Role to User

```bash
curl -X POST http://localhost:3000/api/users/{userId}/roles \
  -H "Content-Type: application/json" \
  -d '{"roleId":"{roleId}"}'
```

## Database

The application uses SQLite with TypeORM for data persistence.

### Database File Location

- Default: `backend/database.db`
- Configurable via `DATABASE_PATH` environment variable

### Tables

- **users** - User accounts
- **roles** - Role definitions
- **entitlements** - Permission definitions
- **user_roles** - User-Role assignments (many-to-many)
- **role_entitlements** - Role-Entitlement assignments (many-to-many)

## Security Considerations

- Passwords are hashed using bcrypt (10 salt rounds)
- CORS enabled for frontend communication (configurable)
- Input validation on all endpoints
- Email validation for user creation
- Username validation (3-50 chars, alphanumeric + underscore/dash)

## Frontend Architecture

Built with standalone Angular components and feature-based module organization:

- **Core Module**: Services, interceptors, shared utilities
- **Shared Module**: Models, reusable components
- **Features**: Independent feature modules for Users, Roles, Entitlements, Dashboard
- **Routing**: Lazy-loaded feature routes
- **Material Design**: Angular Material components for UI

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Building for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

Built files will be in `frontend/dist/`

## Troubleshooting

### Port Already in Use

If port 3000 or 4200 is already in use, you can change them:

- Backend: Set `PORT` in `.env`
- Frontend: Use `ng serve --port 4300`

### Database Errors

If you encounter database errors:

1. Delete the `database.db` file
2. Restart the backend - it will recreate the database with default schema

### CORS Errors

Ensure `CORS_ORIGIN` in `.env` matches your frontend URL.

## Contributing

When making changes:

1. Follow the established project structure
2. Add validation for user inputs
3. Use TypeORM for database operations
4. Follow Angular style guide for frontend code
5. Test changes before committing

## License

MIT

## Support

For issues or questions, please check the API response format and ensure:
- Backend is running on port 3000
- Frontend is running on port 4200
- Database file is accessible and has proper permissions
- Environment variables are correctly configured
