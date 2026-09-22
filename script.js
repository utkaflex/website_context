document.documentElement.classList.add('js');
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Открыть меню');
}
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); }
});
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.matchMedia('(max-width: 700px)').addEventListener('change', closeMenu);
const stages = [
  { status: 'На погрузке', description: 'Склад видит, что нужно отгрузить. Заявка, материалы и машина связаны с одним рейсом.' },
  { status: 'В пути', description: 'Машина отправилась на объект. Диспетчер и получатель видят, что материалы находятся в пути.' },
  { status: 'Доставлено', description: 'Получатель подтверждает приёмку материалов на объекте. Рейс завершён, его история остаётся в системе.' }
];
document.querySelectorAll('[data-stage]').forEach(button => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.stage);
    document.querySelectorAll('[data-stage]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('#route-status').textContent = stages[index].status;
    document.querySelector('#stage-description').textContent = stages[index].description;
    document.querySelector('#route-marker').dataset.position = String(index);
  });
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
