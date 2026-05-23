const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('src/index.html', 'utf8');

const before = html.split('<div id="sections-root"></div>')[0];
const after = html.split('<script src="sections/loader.js" defer></script>\n')[1];

let combined = before + '<div id="sections-root">\n';

for (let i = 1; i <= 30; i++) {
  const sectionHtml = fs.readFileSync(path.join('src/sections', i + '.html'), 'utf8');
  combined += '\n' + sectionHtml;
}

combined += '\n</div>\n' + after;

fs.writeFileSync('dist/index.html', combined, 'utf8');
fs.copyFileSync('src/styles.css', 'dist/styles.css');
fs.copyFileSync('src/script.js', 'dist/script.js');
console.log('Built dist/index.html (' + combined.split('\n').length + ' lines)');
