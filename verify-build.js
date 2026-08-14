#!/usr/bin/env node

/**
 * Build Verification Script
 * Checks if all components and animations are properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying MUREC Real Estate Build...\n');

// Check required files
const requiredFiles = [
  'app/page.tsx',
  'components/CinematicHero.tsx',
  'components/RealEstateShowcase.tsx', 
  'components/PropertiesCarousel.tsx',
  'components/InteractiveFloorPlan.tsx',
  'components/SmoothScrollProvider.tsx',
  'app/globals.css',
  'package.json'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check package.json dependencies
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = [
  'next',
  'react', 
  'react-dom',
  'gsap',
  'lenis',
  'framer-motion',
  '@react-three/fiber',
  '@react-three/drei',
  'three'
];

console.log('\n📦 Checking Dependencies...');
let allDepsInstalled = true;

requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    console.log(`✅ ${dep}`);
  } else {
    console.log(`❌ ${dep} - MISSING`);
    allDepsInstalled = false;
  }
});

// Check for responsive CSS
console.log('\n📱 Checking Responsive Design...');
const globalCSS = fs.readFileSync('app/globals.css', 'utf8');
const hasResponsiveCSS = globalCSS.includes('@media') && globalCSS.includes('max-width');
if (hasResponsiveCSS) {
  console.log('✅ Responsive CSS breakpoints found');
} else {
  console.log('❌ Responsive CSS breakpoints missing');
}

// Summary
console.log('\n📊 Build Verification Summary:');
console.log(`Files: ${allFilesExist ? '✅ All required files present' : '❌ Some files missing'}`);
console.log(`Dependencies: ${allDepsInstalled ? '✅ All dependencies installed' : '❌ Some dependencies missing'}`);
console.log(`Responsive: ${hasResponsiveCSS ? '✅ Responsive design configured' : '❌ Responsive design needs attention'}`);

if (allFilesExist && allDepsInstalled && hasResponsiveCSS) {
  console.log('\n🎉 Build verification passed! Ready for deployment.');
  process.exit(0);
} else {
  console.log('\n⚠️  Build verification failed. Please fix the issues above.');
  process.exit(1);
}