# Node.js Installation Guide - Windows

## Problem
```
Error: node: The term 'node' is not recognized
Error: npm.ps1: node.exe is not found in PATH
```

**Reason**: Node.js is not installed on your system.

---

## Solution: Install Node.js

### Step 1: Download Node.js

Go to **https://nodejs.org** and download:
- **Recommended**: LTS version (v20.11.1 LTS or latest LTS)
- **Latest**: Current version (v21.x or higher)

**For this project, minimum: Node.js v18.x**

### Step 2: Run the Installer

1. Double-click the downloaded `.msi` file (e.g., `node-v20.11.1-x64.msi`)
2. Click "Next" through the installation wizard
3. **IMPORTANT**: Accept the option to add Node to PATH
4. Accept the default installation location
5. Click "Install"
6. Wait for installation to complete (~1-2 minutes)

### Step 3: Verify Installation

**Restart PowerShell** (close and reopen), then run:

```powershell
node --version
npm --version
```

**Expected output**:
```
v20.11.1
10.2.4
```

---

## Alternative: Install Using Package Manager

### Option A: Using Chocolatey (if installed)
```powershell
choco install nodejs
```

### Option B: Using Windows Package Manager
```powershell
winget install OpenJS.NodeJS
```

---

## Troubleshooting

### "Command Still Not Found After Install"

**Solution 1**: Close and reopen PowerShell completely
- The installer updates PATH, but PowerShell needs to restart

**Solution 2**: Manually add to PATH
1. Press `Win + X` → "System"
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "User variables", find "Path" and click "Edit"
5. Click "New"
6. Add: `C:\Program Files\nodejs`
7. Click "OK" three times
8. Restart PowerShell

**Solution 3**: Run PowerShell as Administrator
- Right-click PowerShell → "Run as administrator"
- Run: `node --version`

---

## After Node.js Installation

### Run Dependencies Fix Script

```powershell
cd C:\Dev\VSCodeProjects\CoPilot\entitlements-mgmt
.\fix-dependencies.ps1
```

This will:
- ✅ Install backend dependencies
- ✅ Install frontend dependencies
- ✅ Verify installation
- ✅ Fix any conflicts

---

## Then Start the Application

```powershell
cd C:\Dev\VSCodeProjects\CoPilot\entitlements-mgmt
npm run dev
```

Expected output:
```
Backend server running on http://localhost:3000
Frontend running on http://localhost:4200
```

---

## Verify Node.js Installation

After installing and restarting PowerShell:

### Check Node Version
```powershell
node --version
```
Should output: `v20.x.x` (or higher)

### Check npm Version
```powershell
npm --version
```
Should output: `10.x.x` (or higher)

### Check Node Path
```powershell
Get-Command node
```
Should show the installation path (e.g., `C:\Program Files\nodejs\node.exe`)

### Test Node Works
```powershell
node -e "console.log('Node.js is working!')"
```
Should output: `Node.js is working!`

---

## System Requirements

| Component | Requirement | Recommended |
|-----------|-------------|-------------|
| Node.js | v18.x or higher | v20.x LTS |
| npm | v9.x or higher | v10.x |
| Windows | Windows 10 or higher | Windows 10/11 |
| RAM | 2 GB | 4+ GB |
| Disk | 500 MB | 1+ GB |

---

## Common Issues

### Issue: "Permission Denied" during installation
**Solution**: Run installer as Administrator
1. Right-click the `.msi` file
2. Select "Run as administrator"
3. Follow the wizard

### Issue: npm is not in PATH after installation
**Solution**: Run installer again, select "Add to PATH"
- The installer should have added it
- If not, reinstall and carefully check the "Add to PATH" checkbox

### Issue: Different versions showing
**Solution**: You might have multiple Node installations
```powershell
Get-Command node
Get-Command npm
```
Remove old installations and reinstall latest LTS

### Issue: Still getting "node not found" errors
**Solution**: Uninstall and reinstall
1. Go to Control Panel → Programs → Programs and Features
2. Find "Node.js" and click "Uninstall"
3. Restart computer
4. Download and install from https://nodejs.org
5. **Important**: Check the "Add to PATH" option during install

---

## Next Steps

1. ✅ Install Node.js from https://nodejs.org
2. ✅ Restart PowerShell
3. ✅ Verify: `node --version` shows v18+ and `npm --version` shows v9+
4. ✅ Run: `.\fix-dependencies.ps1` in project root
5. ✅ Start: `npm run dev`
6. ✅ Open: http://localhost:4200 in browser

---

## How to Know Installation Succeeded

All of these should work without errors:

```powershell
# Check Node
node --version          # Should show v18.x or higher

# Check npm
npm --version           # Should show v9.x or higher

# Check npm can install
npm install -g typescript   # Should succeed

# Uninstall test package
npm uninstall -g typescript # Should succeed

# Navigate to project
cd C:\Dev\VSCodeProjects\CoPilot\entitlements-mgmt

# Run dependency fix
.\fix-dependencies.ps1      # Should complete without Node errors
```

---

## Support

If you continue having issues:

1. **Check official Node.js docs**: https://nodejs.org/en/docs/
2. **Review Windows PATH**: https://docs.microsoft.com/windows/win32/shells/environment-variables-user-and-system-shell-variables
3. **Reinstall Node.js** from scratch
4. **Restart your computer** (sometimes PATH changes require full restart)

---

## FAQ

**Q: Which version should I install?**
A: Node.js v20.x LTS (Long Term Support) is recommended for stability.

**Q: Will this affect other applications?**
A: No, Node.js is a standalone development tool. It won't interfere with other software.

**Q: Do I need administrator privileges?**
A: Yes, to install Node.js system-wide. You can run it as a user once installed.

**Q: Can I install multiple Node versions?**
A: Yes, using `nvm` (Node Version Manager), but not needed for this project.

**Q: How much disk space does Node.js take?**
A: ~500 MB (Node) + ~1.5 GB (project dependencies).

---

**Once Node.js is installed, come back and run:**

```powershell
cd C:\Dev\VSCodeProjects\CoPilot\entitlements-mgmt
.\fix-dependencies.ps1
npm run dev
```

Then visit: **http://localhost:4200** 🚀
