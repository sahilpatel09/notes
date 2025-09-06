const fs = require('fs');
const path = require('path');

// Function to check if a file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Function to check if a file should be excluded
function shouldExcludeFile(filePath) {
  const excludePatterns = [
    /_partial-.*\.md$/,
    /_basic-usage-live-preview\.md$/,
    /_crud-live-preview\.md$/,
    /_default-value-live-preview\.md$/,
    /_on-search-live-preview\.md$/,
    /_sort-live-preview\.md$/,
    /_filtering-live-preview\.md$/,
    /_search-live-preview\.md$/,
    /_sorting-live-preview\.md$/,
    /_basic-usage-live-preview\.md$/,
    /_relational-live-preview\.md$/,
    /_sorter-live-preview\.md$/,
  ];
  
  return excludePatterns.some(pattern => pattern.test(filePath));
}

// Function to get all markdown files in a directory recursively
function getAllMarkdownFiles(dirPath, basePath = '') {
  const files = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.join(basePath, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively scan subdirectories
      const subFiles = getAllMarkdownFiles(fullPath, relativePath);
      files.push(...subFiles);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // Skip excluded files
      if (!shouldExcludeFile(entry.name)) {
        const docId = relativePath.replace(/\\/g, '/').replace('.md', '');
        files.push(docId);
      }
    }
  }
  
  return files;
}

// Function to get directory structure
function getDirectoryStructure(dirPath, basePath = '') {
  const structure = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  // Sort entries: directories first, then files
  const directories = entries.filter(entry => entry.isDirectory());
  const files = entries.filter(entry => entry.isFile() && entry.name.endsWith('.md'));
  
  // Process directories
  for (const dir of directories) {
    const fullPath = path.join(dirPath, dir.name);
    const relativePath = path.join(basePath, dir.name);
    
    // Check if this directory has an index.md file
    const indexPath = path.join(fullPath, 'index.md');
    const hasIndex = fileExists(indexPath);
    
    // Get all markdown files in this directory
    const dirFiles = getAllMarkdownFiles(fullPath, relativePath);
    
    if (dirFiles.length > 0) {
      const category = {
        type: 'category',
        label: formatLabel(dir.name),
        items: []
      };
      
      // Add index.md if it exists
      if (hasIndex) {
        category.items.push(relativePath.replace(/\\/g, '/'));
      }
      
      // Add other files in this directory
      for (const file of dirFiles) {
        if (!file.endsWith('/index')) {
          category.items.push(file);
        }
      }
      
      structure.push(category);
    }
  }
  
  // Process root-level markdown files
  for (const file of files) {
    if (!shouldExcludeFile(file.name)) {
      const docId = path.join(basePath, file.name.replace('.md', '')).replace(/\\/g, '/');
      structure.push(docId);
    }
  }
  
  return structure;
}

// Function to format directory names into readable labels
function formatLabel(name) {
  // Handle special cases
  const specialCases = {
    'ui-integrations': 'UI Integrations',
    'migration-guide': 'Migration Guide',
    'getting-started': 'Getting Started',
    'guides-concepts': 'Guides & Concepts',
    'further-readings': 'Further Readings',
    'enterprise-edition': 'Enterprise Edition',
    'creative-learnings': 'Creative Learnings',
    'dsa': 'Data Structures & Algorithms',
    'french': 'French',
    'refine': 'Refine',
    'web2': 'Web Development'
  };
  
  if (specialCases[name]) {
    return specialCases[name];
  }
  
  // Convert kebab-case to Title Case
  return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Function to organize items into logical groups
function organizeItems(items) {
  const organized = [];
  
  // Extract root-level files
  const rootFiles = items.filter(item => typeof item === 'string');
  const categories = items.filter(item => typeof item === 'object');
  
  // Add root files first
  if (rootFiles.length > 0) {
    organized.push({
      type: 'category',
      label: 'Overview',
      className: 'category-as-header',
      items: rootFiles
    });
  }
  
  // Add categories
  organized.push(...categories);
  
  return organized;
}

// Function to generate the sidebar configuration
function generateSidebar() {
  const docsPath = path.join(__dirname, 'docs');
  
  if (!fileExists(docsPath)) {
    console.error('❌ Docs directory does not exist:', docsPath);
    process.exit(1);
  }
  
  console.log('📁 Scanning docs directory:', docsPath);
  
  const sidebarItems = getDirectoryStructure(docsPath);
  const organizedItems = organizeItems(sidebarItems);
  
  // Create the sidebar configuration
  const sidebarConfig = {
    mainSidebar: organizedItems
  };
  
  // Convert to JavaScript module format
  const sidebarContent = `/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').Sidebars} */
module.exports = ${JSON.stringify(sidebarConfig, null, 2)};
`;
  
  // Write to sidebars.js
  fs.writeFileSync(path.join(__dirname, 'sidebars.js'), sidebarContent);
  
  console.log('✅ Sidebar generated successfully!');
  console.log(`📁 Found ${organizedItems.length} top-level categories`);
  
  // Log summary
  console.log('\n📋 Generated sidebar structure:');
  organizedItems.forEach((item, index) => {
    if (typeof item === 'object' && item.type === 'category') {
      console.log(`${index + 1}. ${item.label} (${item.items.length} items)`);
    } else if (typeof item === 'string') {
      console.log(`${index + 1}. ${item} (file)`);
    }
  });
  
  // Log all files found
  console.log('\n📄 All documentation files found:');
  const allFiles = getAllMarkdownFiles(docsPath);
  allFiles.forEach(file => {
    console.log(`  - ${file}`);
  });
}

// Run the generator
try {
  generateSidebar();
} catch (error) {
  console.error('❌ Error generating sidebar:', error.message);
  process.exit(1);
}
