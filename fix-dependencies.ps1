# PowerShell Script for Automatic Dependency Conflict Resolution
# Usage: .\fix-dependencies.ps1

param(
    [switch]$Verbose = $false
)

# Color codes
$Green = "Green"
$Blue = "Cyan"
$Yellow = "Yellow"
$Red = "Red"

function Write-Status {
    param([string]$Message, [string]$Color = $Green)
    Write-Host $Message -ForegroundColor $Color
}

function Clean-And-Install {
    param(
        [string]$Directory,
        [string]$Name
    )
    
    Write-Status "Processing: $Name" $Blue
    
    Push-Location $Directory
    
    # Remove old installations
    Write-Status "  Cleaning old files..." $Yellow
    
    if (Test-Path "node_modules") {
        Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
        Write-Status "    ✓ Removed node_modules" $Green
    }
    
    if (Test-Path "package-lock.json") {
        Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue
        Write-Status "    ✓ Removed package-lock.json" $Green
    }
    
    # Clear npm cache
    Write-Status "  Clearing npm cache..." $Yellow
    npm cache clean --force | Out-Null
    Write-Status "    ✓ Cache cleared" $Green
    
    # Install dependencies
    Write-Status "  Installing dependencies..." $Yellow
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Status "    ✓ $Name installed successfully" $Green
    }
    else {
        Write-Status "    ⚠ $Name installation encountered issues" $Yellow
        Write-Status "    Attempting with legacy peer deps..." $Yellow
        npm install --legacy-peer-deps
        
        if ($LASTEXITCODE -eq 0) {
            Write-Status "    ✓ $Name installed with legacy peer deps" $Green
        }
        else {
            Write-Status "    ✗ $Name installation failed" $Red
        }
    }
    
    Pop-Location
    Write-Host ""
}

function Verify-Installation {
    param([string]$Directory, [string]$Name)
    
    Write-Status "Verifying $Name dependencies:" $Blue
    Push-Location $Directory
    npm list --depth=0
    Pop-Location
    Write-Host ""
}

# Main execution
Write-Host ""
Write-Status "=============================================" $Blue
Write-Status "NPM Dependency Conflict Resolution Script" $Blue
Write-Status "=============================================" $Blue
Write-Host ""

# Check Node.js version
Write-Status "Checking Node.js version..." $Yellow
$nodeVersion = (node --version) -replace 'v', ''
Write-Status "  Node.js: $nodeVersion" $Green
$npmVersion = npm --version
Write-Status "  npm: $npmVersion" $Green
Write-Host ""

# Process backend
Write-Status "Step 1: Installing Backend Dependencies" $Blue
Clean-And-Install "backend" "Backend"

# Process frontend
Write-Status "Step 2: Installing Frontend Dependencies" $Blue
Clean-And-Install "frontend" "Frontend"

# Verify
Write-Status "Step 3: Verifying Installations" $Blue
Verify-Installation "backend" "Backend"
Verify-Installation "frontend" "Frontend"

Write-Status "=============================================" $Blue
Write-Status "✓ Dependency resolution complete!" $Green
Write-Status "=============================================" $Blue
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Run: npm run dev"
Write-Host "  2. Open: http://localhost:4200 in browser"
Write-Host ""
