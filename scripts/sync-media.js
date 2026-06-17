const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'Media_Assets');
const destPublicDir = path.join(rootDir, 'public', 'Media_Assets');

// Helper to copy directory recursively
function copyDirSync(src, dest, exclude = []) {
  if (exclude.includes(path.basename(src))) return;
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath, exclude);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function sync() {
  console.log('Syncing media assets...');
  
  if (!fs.existsSync(sourceDir)) {
    console.error(`Error: Source directory ${sourceDir} does not exist.`);
    process.exit(1);
  }
  
  // 1. Copy Media_Assets/ to public/Media_Assets/ excluding the 'src' directory
  copyDirSync(sourceDir, destPublicDir, ['src']);
  console.log(`Synced assets to ${destPublicDir}`);
  
  // 2. Sync src/app/favicon.ico
  const srcFavicon = path.join(sourceDir, 'src', 'app', 'favicon.ico');
  const destFavicon = path.join(rootDir, 'src', 'app', 'favicon.ico');
  if (fs.existsSync(srcFavicon)) {
    const destFaviconDir = path.dirname(destFavicon);
    if (!fs.existsSync(destFaviconDir)) {
      fs.mkdirSync(destFaviconDir, { recursive: true });
    }
    fs.copyFileSync(srcFavicon, destFavicon);
    console.log(`Synced favicon to ${destFavicon}`);
  }
  
  console.log('Media assets sync complete.');
}

sync();
