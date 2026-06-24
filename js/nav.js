const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

if (toggle) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
}

document.addEventListener('click', e => {
  if (!nav.contains(e.target)) links.classList.remove('open');
});

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});
