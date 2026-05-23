const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf8');

const before = html.split('<div id="sections-root"></div>')[0];
const after = html.split('sections/loader.js')[1];

let combined = before + '<div id="sections-root">\n';

for (let i = 1; i <= 30; i++) {
  const sectionHtml = fs.readFileSync(path.join('sections', i + '.html'), 'utf8');
  combined += '\n' + sectionHtml;
}

combined += '\n</div>\n' + after;

fs.writeFileSync('index.static.html', combined, 'utf8');
console.log('Written index.static.html (' + combined.split('\n').length + ' lines)');
