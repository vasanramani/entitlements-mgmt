# Quick Start Guide

## 📁 Project Location
`C:\Dev\VSCodeProjects\CoPilot\entitlements-mgmt`

## 🚀 Quick Start (5 minutes)

### Step 1: Install Node.js (if not already installed)
- Download from https://nodejs.org (v18+)
- Verify: `node --version` and `npm --version` in PowerShell

### Step 2: Navigate to Project
```powershell
cd C:\Dev\VSCodeProjects\CoPilot\entitlements-mgmt
```

### Step 3: Install Dependencies
```powershell
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### Step 4: Configure Backend (Optional - defaults work)
```powershell
copy backend\.env.example backend\.env
```

### Step 5: Start the Application
```powershell
npm run dev
```

This will start:
- **Backend**: http://localhost:3200
- **Frontend**: http://localhost:4200

### Step 6: Open in Browser
Navigate to: **http://localhost:4200**

---

## 🎯 What You Can Do Now

1. **Dashboard** (default page)
   - View statistics: Total Users, Roles, Entitlements

2. **Entitlements** (left menu)
   - View default entitlements: read, write, delete, manage_users
   - Create new entitlements
   - Edit/Delete existing entitlements

3. **Roles** (left menu)
   - Create new roles
   - Assign entitlements to roles
   - Edit/Delete roles

4. **Users** (left menu)
   - Create new users (with username, email, password)
   - Assign roles to users
   - Edit/Delete users

---

## 📊 Example Workflow

1. **Create an Entitlement** (if you want custom ones)
   - Go to Entitlements page
   - Click "Add Entitlement"
   - Enter name (e.g., "export") and description
   - Save

2. **Create a Role**
   - Go to Roles page
   - Click "Add Role"
   - Enter role name (e.g., "editor") and description
   - Save

3. **Assign Entitlements to Role**
   - Find the role in Roles table
   - Click "Add Task" icon
   - Select entitlements to add
   - Save

4. **Create a User**
   - Go to Users page
   - Click "Add User"
   - Enter username, email, password
   - Save

5. **Assign Roles to User**
   - Find the user in Users table
   - Click edit icon
   - Or use the API to add roles

---

## 🔌 API Base URL
```
http://localhost:3200/api
```

### Quick API Examples

**Get all users:**
```powershell
curl http://localhost:3200/api/users
```

**Get all roles:**
```powershell
curl http://localhost:3200/api/roles
```

**Get all entitlements:**
```powershell
curl http://localhost:3200/api/entitlements
```

---

## 📚 Key Files to Know

| Purpose | File |
|---------|------|
| Setup & Usage | `README.md` |
| Database Initialization | `backend/src/utils/database.ts` |
| Main Backend Server | `backend/src/app.ts` |
| User Management Logic | `backend/src/services/UserService.ts` |
| Role Management Logic | `backend/src/services/RoleService.ts` |
| Entitlement Management | `backend/src/services/EntitlementService.ts` |
| Main Frontend Component | `frontend/src/app/app.component.ts` |
| Dashboard Page | `frontend/src/app/features/dashboard/dashboard.component.ts` |
| Users Page | `frontend/src/app/features/users/users.component.ts` |
| Roles Page | `frontend/src/app/features/roles/roles.component.ts` |
| Entitlements Page | `frontend/src/app/features/entitlements/entitlements.component.ts` |

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| npm not found | Install Node.js from https://nodejs.org |
| Port 3000 in use | Change `PORT` in `backend/.env` |
| Port 4200 in use | Run `ng serve --port 4300` in frontend folder |
| Can't connect frontend to backend | Check backend is running, CORS_ORIGIN in .env |
| Database errors | Delete `backend/database.db` and restart backend |

---

## 📁 Project Structure at a Glance

```
entitlements-mgmt/
├── backend/           ← Node.js/Express API
│   └── src/
│       ├── entities/  ← Database models
│       ├── services/  ← Business logic
│       ├── controllers/ ← API handlers
│       └── routes/    ← API routes
├── frontend/          ← Angular web app
│   └── src/
│       └── app/
│           ├── core/  ← Services & interceptors
│           ├── features/ ← Pages (Users, Roles, etc)
│           └── shared/ ← Models & helpers
├── README.md          ← Full documentation
└── package.json       ← Root configuration
```

---

## ✅ Default Entitlements

When the backend starts for the first time, these are automatically created:

- **read** - Read access to resources
- **write** - Write/Create access to resources
- **delete** - Delete access to resources
- **manage_users** - Manage users and roles

---

## 🔒 Security Notes

- Passwords are hashed with bcrypt (10 rounds)
- Frontend runs on port 4200, Backend on 3000
- CORS is configured in backend/.env
- All inputs are validated
- Email format is validated

---

## 📝 For Development

**Backend Development:**
```powershell
cd backend
npm run dev  # Auto-reloads on file changes
```

**Frontend Development:**
```powershell
cd frontend
npm run dev  # Auto-reloads on file changes
```

---

## 🎉 You're Ready!

Your entitlements management system is now ready to use. Start with the Frontend at **http://localhost:4200** and begin creating users, roles, and managing entitlements!

For detailed API documentation and advanced features, see `README.md`
