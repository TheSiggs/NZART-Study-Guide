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

function filterNav(q) {
  q = q.toLowerCase();
  document.querySelectorAll('#nav-list li').forEach(li => {
    li.style.display = (!q || li.textContent.toLowerCase().includes(q)) ? '' : 'none';
  });
}
