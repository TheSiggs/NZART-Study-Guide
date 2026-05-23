(async function() {
  const root = document.getElementById('sections-root');
  if (!root) return;
  const total = 30;
  for (let i = 1; i <= total; i++) {
    try {
      const resp = await fetch('sections/' + i + '.html');
      const html = await resp.text();
      const temp = document.createElement('div');
      temp.innerHTML = html;
      while (temp.firstChild) root.appendChild(temp.firstChild);
    } catch (e) {
      console.error('Failed to load section ' + i, e);
    }
  }
  document.dispatchEvent(new Event('sections-loaded'));
})();
