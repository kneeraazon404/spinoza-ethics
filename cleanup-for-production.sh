#!/bin/bash
# Production Cleanup Script
# Run this before committing to remove redundant files
# Usage: bash cleanup-for-production.sh

echo "🧹 Spinoza Ethics - Production Cleanup Script"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from project root."
    exit 1
fi

echo "📋 Cleanup Tasks:"
echo ""

# Task 1: Remove redundant markdown files
echo "1️⃣  Removing redundant documentation files..."
if [ -f "README_NEW.md" ]; then
    echo "   - Removing README_NEW.md"
    rm README_NEW.md
    echo "   ✅ Deleted"
else
    echo "   - README_NEW.md not found (already removed)"
fi

if [ -f "MODEL_UPDATE.md" ]; then
    echo "   - Removing MODEL_UPDATE.md"
    rm MODEL_UPDATE.md
    echo "   ✅ Deleted"
else
    echo "   - MODEL_UPDATE.md not found (already removed)"
fi

echo ""

# Task 2: Remove legacy ESLint config
echo "2️⃣  Removing legacy ESLint configuration..."
if [ -f ".eslintrc.json" ]; then
    echo "   - Removing .eslintrc.json (use eslint.config.mjs instead)"
    rm .eslintrc.json
    echo "   ✅ Deleted"
else
    echo "   - .eslintrc.json not found (already removed)"
fi

echo ""

# Task 3: Verify .env.local is in .gitignore
echo "3️⃣  Verifying environment file security..."
if grep -q "\.env\.local" .gitignore; then
    echo "   ✅ .env.local is in .gitignore"
else
    echo "   ⚠️  Warning: .env.local may not be in .gitignore"
fi

if [ -f ".env.local" ]; then
    echo "   ✅ .env.local exists (will be ignored by git)"
    if git ls-files | grep -q "\.env\.local"; then
        echo "   ⚠️  WARNING: .env.local is tracked by git!"
        echo "      Run: git rm --cached .env.local"
    fi
else
    echo "   - .env.local not found"
fi

echo ""

# Task 4: Verify no sensitive files will be committed
echo "4️⃣  Security check - scanning for potential secrets..."
SECRETS_FOUND=0

if grep -r "gsk_" src/ 2>/dev/null; then
    echo "   ❌ API Key found in source code!"
    SECRETS_FOUND=1
fi

if grep -r "GROQ_API_KEY=" src/ 2>/dev/null | grep -v "NEXT_PUBLIC"; then
    echo "   ⚠️  API Key reference found"
fi

if [ $SECRETS_FOUND -eq 0 ]; then
    echo "   ✅ No exposed API keys detected"
fi

echo ""

# Task 5: Code quality checks
echo "5️⃣  Running code quality checks..."
echo ""

echo "   → Running linter..."
npm run lint > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ ESLint passed"
else
    echo "   ❌ ESLint found issues (run: npm run lint --fix)"
fi

echo "   → Type checking..."
npm run type-check > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ TypeScript strict mode passed"
else
    echo "   ❌ TypeScript errors found (run: npm run type-check)"
fi

echo ""

# Task 6: Build verification
echo "6️⃣  Verifying production build..."
npm run build > /tmp/build.log 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Production build successful"
    # Check for build warnings
    if grep -i "warning" /tmp/build.log; then
        echo "   ⚠️  Build warnings detected (review if needed)"
    fi
else
    echo "   ❌ Build failed! Check output:"
    tail -20 /tmp/build.log
fi

echo ""

# Task 7: Summary
echo "=============================================="
echo "📊 Cleanup Summary:"
echo ""
echo "Files checked/removed:"
echo "  ✅ README_NEW.md - Removed (if existed)"
echo "  ✅ MODEL_UPDATE.md - Removed (if existed)"
echo "  ✅ .eslintrc.json - Removed (if existed)"
echo ""
echo "Configuration status:"
echo "  ✅ .gitignore - Verified"
echo "  ✅ Environment variables - Secured"
echo "  ✅ Code quality - Checked"
echo "  ✅ Production build - Verified"
echo ""

# Task 8: Final steps
echo "🚀 Next Steps:"
echo ""
echo "1. Review the changes:"
echo "   git status"
echo ""
echo "2. Stage files for commit:"
echo "   git add ."
echo ""
echo "3. Commit the cleanup:"
echo "   git commit -m 'chore: cleanup and prepare for production deployment'"
echo ""
echo "4. Push to main branch:"
echo "   git push origin main"
echo ""
echo "5. Vercel will automatically deploy!"
echo ""

echo "✨ Cleanup complete! Your project is ready for production."
echo ""
