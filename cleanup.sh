#!/bin/bash
# Quick Cleanup - Remove redundant files for production

# Remove all markdown files except README.md
rm -f README_NEW.md
rm -f CLEANUP_GUIDE.md
rm -f DEPLOYMENT_CHECKLIST.md
rm -f PRODUCTION_READY.md
rm -f MODEL_UPDATE.md
rm -f cleanup-for-production.sh

echo "✅ Cleanup complete!"
echo ""
echo "Remaining files:"
ls -la *.md
