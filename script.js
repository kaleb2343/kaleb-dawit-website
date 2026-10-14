// Load Google Fonts without blocking the first paint
const gFonts = document.getElementById('gfonts');
if (gFonts) {
  if (gFonts.sheet) { gFonts.media = 'all'; }
  else { gFonts.addEventListener('load', () => { gFonts.media = 'all'; }); }
}

// Right-click disabled
document.addEventListener('contextmenu', (e) => e.preventDefault());

const phrases = ["Graphic Designer.", "Digital Marketer.", "Developer."];
const el = document.getElementById('rotating-text');
let p = 0, c = 0, deleting = false;

function type() {
  const word = phrases[p];
  el.textContent = deleting ? word.slice(0, --c) : word.slice(0, ++c);
  let delay = deleting ? 50 : 100;
  if (!deleting && c === word.length) { delay = 1400; deleting = true; }
  else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 300; }
  setTimeout(type, delay);
}
type();

const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const isDay = html.getAttribute('data-theme') === 'day';
  html.setAttribute('data-theme', isDay ? 'night' : 'day');
  themeToggle.textContent = isDay ? '☀️' : '🌙';
});

// Logo click: reload the site and start from the top
const brandLogo = document.getElementById('brand');
brandLogo.addEventListener('click', (e) => {
  e.preventDefault();
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  window.location.reload();
});

const statsRow = document.getElementById('stats-row');
let statsAnimated = false;
function animateStats() {
  const numbers = statsRow.querySelectorAll('strong');
  numbers.forEach(numEl => {
    const target = parseInt(numEl.dataset.count, 10);
    let current = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / target), 40);
    const timer = setInterval(() => {
      current++;
      numEl.textContent = current;
      if (current >= target) clearInterval(timer);
    }, stepTime);
  });
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateStats();
      observer.disconnect();
    }
  });
}, { threshold: 0.4 });
observer.observe(statsRow);

// Development day/night swap
document.querySelectorAll('.swap-img').forEach(wrap => {
  const imgA = wrap.querySelector('.swap-a');
  const imgB = wrap.querySelector('.swap-b');
  let showingA = true;
  setInterval(() => {
    showingA = !showingA;
    imgA.classList.toggle('is-visible', showingA);
    imgB.classList.toggle('is-visible', !showingA);
  }, 3000);
});

// Image lists: the hidden list at the bottom of index.html is the ONE place to add or change images.
// The cards below and the lightbox both read from it, so they always stay in sync.
const groups = {};
document.querySelectorAll('#group-data > div').forEach(block => {
  const g = block.getAttribute('data-group');
  groups[g] = Array.from(block.querySelectorAll('img')).map(img => img.getAttribute('src'));
});

// Graphic Design card cycling (sharp image + blurred background in sync)
document.querySelectorAll('.cycle-wrap').forEach(wrap => {
  const list = groups[wrap.getAttribute('data-group')];
  if (list && list.length) {
    wrap.innerHTML = '';
    ['cycle-bg', 'cycle-img'].forEach(cls => {
      list.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.loading = 'lazy';
        img.draggable = false;
        img.decoding = 'async';
        if (cls === 'cycle-bg') { img.alt = ''; img.setAttribute('aria-hidden', 'true'); }
        else { const h4 = wrap.closest('.work-card') && wrap.closest('.work-card').querySelector('h4'); img.alt = (h4 ? h4.textContent : 'Project') + ' ' + (idx + 1); }
        img.className = cls + (idx === 0 ? ' is-visible' : '');
        wrap.appendChild(img);
      });
    });
  }
  const fg = Array.from(wrap.querySelectorAll('.cycle-img'));
  const bg = Array.from(wrap.querySelectorAll('.cycle-bg'));
  if (fg.length < 2) return;
  let i = 0;
  setInterval(() => {
    fg[i].classList.remove('is-visible');
    bg[i].classList.remove('is-visible');
    i = (i + 1) % fg.length;
    fg[i].classList.add('is-visible');
    bg[i].classList.add('is-visible');
  }, 3000);
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
let currentImages = [];
let currentIndex = 0;

function openLightbox(groupName) {
  if (!groups[groupName] || !groups[groupName].length) return;
  currentImages = groups[groupName];
  currentIndex = 0;
  lbImg.src = currentImages[currentIndex];
  lightbox.classList.add('open');
}
function showImage(i) {
  currentIndex = (i + currentImages.length) % currentImages.length;
  lbImg.src = currentImages[currentIndex];
}

document.querySelectorAll('.gallery-trigger').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openLightbox(btn.getAttribute('data-group'));
  });
});

document.getElementById('lb-close').addEventListener('click', () => lightbox.classList.remove('open'));
document.getElementById('lb-prev').addEventListener('click', () => showImage(currentIndex - 1));
document.getElementById('lb-next').addEventListener('click', () => showImage(currentIndex + 1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });

// Arrow button: appears after scrolling, always goes back to the top
const goUpBtn = document.getElementById('go-up');
function updateArrow() {
  goUpBtn.classList.toggle('visible', window.scrollY > 300);
}
window.addEventListener('scroll', updateArrow);
window.addEventListener('resize', updateArrow);
updateArrow();
goUpBtn.setAttribute('aria-label', 'Scroll to top');
goUpBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// CV popup
const cvModal = document.getElementById('cv-modal');
const cvView = document.getElementById('cv-view');
const cvClose = document.getElementById('cv-close');
function openCv() { cvModal.classList.add('open'); document.body.classList.add('modal-open'); cvModal.scrollTop = 0; }
function closeCv() { cvModal.classList.remove('open'); document.body.classList.remove('modal-open'); }
cvView.addEventListener('click', openCv);
const cvPeek = document.getElementById('cv-peek');
cvPeek.addEventListener('click', openCv);
cvClose.addEventListener('click', closeCv);
cvModal.addEventListener('click', (e) => { if (e.target === cvModal || e.target.classList.contains('cv-sheet')) closeCv(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeCv(); lightbox.classList.remove('open'); }
});

// Email me button: copies my address, shows a small popup, then opens the mail app
const emailBtn = document.getElementById('email-btn');
const toast = document.getElementById('toast');
let emailBusy = false;
emailBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  if (emailBusy) return;
  emailBusy = true;
  const email = 'kalebdawit2343@gmail.com';
  try {
    await navigator.clipboard.writeText(email);
  } catch (err) {
    const ta = document.createElement('textarea');
    ta.value = email;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (er) {}
    ta.remove();
  }
  toast.classList.add('show');
  setTimeout(() => { window.location.href = 'mailto:' + email; }, 1600);
  setTimeout(() => { toast.classList.remove('show'); emailBusy = false; }, 2400);
});