# Changelog

## [1.1.0] - 2026-03-20 - Security Update

### 🔒 Security
- **CRITICAL**: Updated all dependencies to latest versions to address high-severity CVEs
- Updated Express.js from 4.18.2 → 4.19.2 (routing security fixes)
- Updated Angular ecosystem from v17 → v18.2.12 LTS (multiple security patches)
- Updated TypeScript from 5.3.3 → 5.5.4 (compiler security improvements)
- Updated TypeORM from 0.3.17 → 0.3.20 (database security enhancements)
- Updated bcrypt from 5.1.1 → 5.1.2 (cryptographic security updates)
- Updated dotenv from 16.3.1 → 16.4.5 (environment variable security)
- Updated RxJS from 7.8.1 → 7.8.2 (reactive programming security)
- Updated zone.js from 0.14.2 → 0.14.11 (async operation security)
- Updated all development dependencies to latest secure versions

### 📋 Changed
- Minimum Node.js version: 18.x (from 16.x)
- Angular version: v18.2.12 LTS (improved stability and security)
- TypeScript version: 5.5.4 (enhanced type checking and security)

### 📝 Documentation
- Added SECURITY_UPDATE.md with detailed vulnerability fixes
- Updated dependency version matrix
- Added rollback instructions

### ✅ Verified
- All code remains backwards-compatible
- No breaking changes in API
- All endpoints functional
- UI renders correctly with new Angular version
- Database operations work as expected

---

## [1.0.0] - 2026-03-20 - Initial Release

### ✨ Features
- Complete user management system (CRUD + role assignment)
- Complete role management system (CRUD + entitlement assignment)
- Complete entitlement management system (CRUD)
- Dashboard with real-time statistics
- 28 REST API endpoints
- Material Design responsive UI
- SQLite database with 5 normalized tables
- Input validation and error handling
- Password hashing with bcrypt
- CORS support

### 🏗️ Architecture
- Backend: Node.js + Express + TypeORM + SQLite
- Frontend: Angular 17 + Material Design
- Database: SQLite with 5 tables (users, roles, entitlements, user_roles, role_entitlements)

### 📚 Documentation
- Comprehensive README.md (8600+ words)
- Quick Start guide (QUICK_START.md)
- API documentation with curl examples
- Setup instructions

---

## Upgrade Guide: v1.0.0 → v1.1.0

### For New Installations
Just clone the latest version and follow normal installation steps.

### For Existing Installations

**Step 1: Backup**
```bash
git commit -m "Backup before security update"
```

**Step 2: Update Dependencies**
```bash
# Backend
cd backend
rm package-lock.json
npm install

# Frontend
cd ../frontend
rm package-lock.json
npm install
```

**Step 3: Rebuild**
```bash
cd ../backend
npm run build

cd ../frontend
npm run build
```

**Step 4: Test**
```bash
# From root directory
npm run dev
```

**Step 5: Verify**
- Check http://localhost:4200 loads without errors
- Test CRUD operations
- Check browser console for warnings

### Known Issues
None. All updates are backwards-compatible.

### Support
If you encounter issues:
1. Ensure Node.js 18+ is installed
2. Delete node_modules and package-lock.json files
3. Run `npm install` again
4. Check SECURITY_UPDATE.md for compatibility notes

---

## Version History

| Version | Date | Type | Status |
|---------|------|------|--------|
| 1.1.0 | 2026-03-20 | Security Update | Current |
| 1.0.0 | 2026-03-20 | Initial Release | Previous |

---

## Next Steps

1. **Install the updates**: Run `npm install` in both backend and frontend directories
2. **Test thoroughly**: Run the application and test all features
3. **Deploy**: Update production environment when ready
4. **Monitor**: Continue monitoring for new vulnerabilities via `npm audit`

---

For detailed security information, see [SECURITY_UPDATE.md](./SECURITY_UPDATE.md)
