#!/bin/bash
# Automated Dependency Conflict Resolution Script
# This script fixes npm dependency conflicts automatically

echo "=========================================="
echo "Dependency Conflict Resolution Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to clean and reinstall dependencies
clean_install() {
    local dir=$1
    local name=$2
    
    echo -e "${BLUE}Processing: ${name}${NC}"
    cd "$dir"
    
    # Remove old files
    echo "Cleaning old node_modules and lock files..."
    rm -rf node_modules
    rm -f package-lock.json
    
    # Clear npm cache
    echo "Clearing npm cache..."
    npm cache clean --force
    
    # Install dependencies
    echo "Installing dependencies..."
    npm install
    
    # Check if installation was successful
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ ${name} installed successfully${NC}"
    else
        echo -e "${YELLOW}⚠ ${name} installation encountered issues${NC}"
        echo "Attempting with legacy peer deps flag..."
        npm install --legacy-peer-deps
    fi
    
    cd ..
    echo ""
}

# Main execution
echo -e "${BLUE}Step 1: Fixing backend dependencies${NC}"
clean_install "backend" "Backend"

echo -e "${BLUE}Step 2: Fixing frontend dependencies${NC}"
clean_install "frontend" "Frontend"

# Verify installations
echo -e "${BLUE}Step 3: Verifying installations${NC}"
echo ""

echo "Backend dependencies:"
cd backend
npm list --depth=0
cd ..

echo ""
echo "Frontend dependencies:"
cd frontend
npm list --depth=0
cd ..

echo ""
echo -e "${GREEN}=========================================="
echo "Dependency resolution complete!"
echo "==========================================${NC}"
echo ""
echo "Next steps:"
echo "1. npm run dev  (to start the application)"
echo "2. Open http://localhost:4200 in browser"
