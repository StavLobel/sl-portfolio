#!/usr/bin/env node

/**
 * Deployment Helper Script for Hostinger
 * Prepares the build and provides deployment instructions
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Portfolio Deployment Helper\n');

// Step 1: Clean and build
console.log('📦 Building production files...');
try {
  execSync('npm run clean', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 2: Check dist folder contents
const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Dist folder not found!');
  process.exit(1);
}

const distFiles = fs.readdirSync(distPath);
console.log('📁 Build output files:');
distFiles.forEach(file => {
  const filePath = path.join(distPath, file);
  const stats = fs.statSync(filePath);
  const size = (stats.size / 1024).toFixed(2);
  console.log(`   ${file} ${stats.isDirectory() ? '(folder)' : `(${size}KB)`}`);
});
console.log('');

// Step 3: Provide deployment instructions
console.log('🌐 Next Steps for Hostinger Deployment:\n');
console.log('1. Log into your Hostinger control panel (hPanel)');
console.log('2. Go to "Files" → "File Manager"');
console.log('3. Navigate to the "public_html" folder');
console.log('4. Delete any existing files in public_html');
console.log('5. Upload ALL files from the "dist" folder to public_html');
console.log('   - Select all files INSIDE the dist folder');
console.log('   - Do NOT upload the dist folder itself');
console.log('6. Ensure .htaccess file is uploaded for proper routing\n');

console.log('📋 Files to upload to public_html:');
distFiles.forEach(file => {
  console.log(`   ✓ ${file}`);
});
console.log('');

// Step 4: Environment variables reminder
console.log('⚠️  Important Notes:');
console.log('• Environment variables are built into the bundle');
console.log('• GitHub token is embedded (ensure it has minimal permissions)');
console.log('• Enable SSL in Hostinger for HTTPS');
console.log('• Test all functionality after deployment\n');

console.log('🎉 Ready for deployment!');
console.log('📖 See DEPLOYMENT.md for detailed instructions'); 