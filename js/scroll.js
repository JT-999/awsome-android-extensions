const reveals = () => {
  document.querySelectorAll('.reveal:not(.in)').forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 60) el.classList.add('in');
  });
};
window.addEventListener('scroll', reveals);
window.addEventListener('DOMContentLoaded', reveals);
