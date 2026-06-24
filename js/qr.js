document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.qr-float-btn');
  const wrap = document.querySelector('.qr-float');
  if (!btn || !wrap) return;

  btn.addEventListener('click', () => wrap.classList.toggle('open'));

  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) wrap.classList.remove('open');
  });
});
