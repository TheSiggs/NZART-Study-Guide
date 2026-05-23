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

fs.copyFile('styles.css', 'dist/styles.css', (err) => {
  if (err) throw err;
  console.log('styles.css copied successfully!');
});

fs.copyFile('script.js', 'dist/script.js', (err) => {
  if (err) throw err;
  console.log('script.js copied successfully!');
});

fs.writeFileSync('dist/index.html', combined, 'utf8');
console.log('Written index.static.html (' + combined.split('\n').length + ' lines)');
