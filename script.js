(() => {
  const pages = [...document.querySelectorAll('.page')];
  const dots = [...document.querySelectorAll('.dot')];
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const label = document.getElementById('pageLabel');
  let index = 0;

  function go(n) {
    if (n < 0 || n >= pages.length) return;
    index = n;

    pages.forEach((page, k) => {
      page.classList.toggle('active', k === index);
      page.classList.toggle('before', k < index);
    });
    dots.forEach((dot, k) => dot.classList.toggle('active', k === index));

    prev.disabled = index === 0;
    next.disabled = index === pages.length - 1;

    const num = String(index + 1).padStart(2, '0');
    const total = String(pages.length).padStart(2, '0');
    label.textContent = `${num} / ${total} \u00B7 ${pages[index].dataset.title}`;
  }

  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));
  dots.forEach((dot, k) => dot.addEventListener('click', () => go(k)));

  // Keyboard: left / right arrows
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(index + 1);
    if (e.key === 'ArrowLeft') go(index - 1);
  });

  // Swipe on touch screens
  let startX = null;
  document.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });

  go(0);
})();
