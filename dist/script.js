document.addEventListener('click', e => {
  const li = e.target.closest('.options li');
  if (!li) return;
  const q = li.closest('.question');
  if (q && !q.classList.contains('revealed')) {
    q.querySelectorAll('.options li').forEach(x => x.classList.remove('selected'));
    li.classList.add('selected');
  }
});

function revealAnswer(btn) {
  const q = btn.closest('.question');
  q.classList.add('revealed');
  btn.style.display = 'none';
  q.querySelector('.answer-label').style.display = '';
  const sel = q.querySelector('.options li.selected');
  if (sel) q.classList.add(sel.dataset.correct === 'true' ? 'correct' : 'wrong');
  updateScore(q.closest('.question-section'));
}

function revealAll(btn) {
  btn.closest('.question-section').querySelectorAll('.question:not(.revealed) .reveal-btn').forEach(b => revealAnswer(b));
}

function resetAll(btn) {
  const sec = btn.closest('.question-section');
  sec.querySelectorAll('.question').forEach(q => {
    q.classList.remove('revealed','correct','wrong');
    q.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
    const rb = q.querySelector('.reveal-btn'); if (rb) rb.style.display = '';
    const al = q.querySelector('.answer-label'); if (al) al.style.display = 'none';
  });
  const sd = sec.querySelector('.score-display'); if (sd) sd.textContent = '';
}

function updateScore(sec) {
  const sd = sec.querySelector('.score-display'); if (!sd) return;
  const total = sec.querySelectorAll('.question').length;
  const revealed = sec.querySelectorAll('.question.revealed').length;
  const correct = sec.querySelectorAll('.question.correct').length;
  const wrong = sec.querySelectorAll('.question.wrong').length;
  if (revealed > 0) sd.textContent = revealed+'/'+total+' answered · '+correct+' correct · '+wrong+' wrong';
}

function initNavObserver() {
  const allSec = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav-list a');
  allSec.forEach(s => {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach(a => a.parentElement.classList.toggle('active', a.getAttribute('href') === '#' + id));
          const active = document.querySelector('#nav-list li.active a');
          if (active) active.scrollIntoView({block:'nearest', behavior:'smooth'});
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' }).observe(s);
  });
}

document.addEventListener('sections-loaded', initNavObserver);

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
  document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const overlay = document.getElementById('sidebar-overlay');
  if (toggle) toggle.addEventListener('click', toggleSidebar);
  if (overlay) overlay.addEventListener('click', toggleSidebar);

  // Close sidebar when a nav link is clicked on mobile
  document.querySelectorAll('#nav-list a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768) toggleSidebar();
    });
  });

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
  if (themeBtn) {
    themeBtn.textContent = saved === 'light' ? '☀️' : '🌙';
    themeBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const isLight = html.getAttribute('data-theme') === 'light';
      html.setAttribute('data-theme', isLight ? '' : 'light');
      localStorage.setItem('theme', isLight ? '' : 'light');
      themeBtn.textContent = isLight ? '🌙' : '☀️';
    });
  }
});

function filterNav(q) {
  q = q.toLowerCase();
  document.querySelectorAll('#nav-list li').forEach(li => {
    li.style.display = (!q || li.textContent.toLowerCase().includes(q)) ? '' : 'none';
  });
}
