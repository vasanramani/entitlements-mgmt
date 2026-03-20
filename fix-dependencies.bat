@echo off
REM Windows Batch Script - Automated Dependency Conflict Resolution

echo.
echo ==========================================
echo Dependency Conflict Resolution Script
echo ==========================================
echo.

REM Colors not easily available in batch, using simple output

REM Function-like behavior for backend
echo [*] Processing Backend Dependencies
cd backend
echo     Cleaning old files...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
echo     Clearing npm cache...
call npm cache clean --force
echo     Installing dependencies...
call npm install

REM Check if npm install succeeded
if errorlevel 1 (
    echo [!] Backend installation encountered issues
    echo [*] Attempting with legacy peer deps flag...
    call npm install --legacy-peer-deps
)

cd ..
echo [OK] Backend processing complete
echo.

REM Function-like behavior for frontend
echo [*] Processing Frontend Dependencies
cd frontend
echo     Cleaning old files...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
echo     Clearing npm cache...
call npm cache clean --force
echo     Installing dependencies...
call npm install

REM Check if npm install succeeded
if errorlevel 1 (
    echo [!] Frontend installation encountered issues
    echo [*] Attempting with legacy peer deps flag...
    call npm install --legacy-peer-deps
)

cd ..
echo [OK] Frontend processing complete
echo.

REM Verify installations
echo [*] Verifying Backend Dependencies
cd backend
call npm list --depth=0
cd ..
echo.

echo [*] Verifying Frontend Dependencies
cd frontend
call npm list --depth=0
cd ..
echo.

echo ==========================================
echo [OK] Dependency resolution complete!
echo ==========================================
echo.
echo Next steps:
echo   1. npm run dev
echo   2. Open http://localhost:4200 in browser
echo.
pause
