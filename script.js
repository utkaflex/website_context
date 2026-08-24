const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); });
nav.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); });

const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const legal = {
  privacy: `<h2>Политика обработки персональных данных</h2><p><b>Редакция от 24 августа 2026 года.</b> Это шаблон. До публикации замените все поля в квадратных скобках и согласуйте документ с юристом с учётом реальных процессов.</p><h3>1. Оператор</h3><p>[Полное наименование], ИНН [номер], ОГРН [номер], адрес: [юридический адрес], e-mail для обращений: [privacy@company.ru] (далее — Оператор).</p><h3>2. Данные и цели</h3><p>Через форму обратной связи Оператор обрабатывает имя, телефон и/или e-mail, содержание обращения, а также технические данные, необходимые для работы сайта. Цель — обработка обращения, подготовка ответа и переговоры о заключении договора.</p><h3>3. Основание, действия и сроки</h3><p>Основание — согласие субъекта. Действия: сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача обработчикам [указать при наличии], блокирование и уничтожение. Данные обращения хранятся [указать срок] либо до отзыва согласия, если нет другого законного основания.</p><h3>4. Хранение и защита</h3><p>При сборе данных граждан РФ запись, систематизация, накопление, хранение, уточнение и извлечение осуществляются с использованием баз данных на территории РФ. Оператор принимает необходимые правовые, организационные и технические меры защиты.</p><h3>5. Cookie</h3><p>Необходимые cookie обеспечивают работу сайта. Аналитические cookie используются только после выбора пользователя. Укажите фактический перечень, сроки и поставщиков аналитики до её подключения.</p><h3>6. Права субъекта</h3><p>Субъект вправе запросить сведения об обработке, уточнение, блокирование или уничтожение данных, а также отозвать согласие письмом на [privacy@company.ru]. Оператор отвечает в сроки, установленные законодательством РФ.</p><h3>7. Актуализация</h3><p>Политика действует до замены новой редакцией. Актуальная версия постоянно доступна на этой странице.</p>`,
  consent: `<h2>Согласие на обработку персональных данных</h2><p>Устанавливая отдельный флажок под формой и нажимая «Отправить заявку», я свободно, своей волей и в своём интересе даю [полное наименование, адрес, ИНН/ОГРН] согласие на обработку указанных мной имени, телефона и/или e-mail и текста обращения.</p><p><b>Цель:</b> обработка обращения, связь со мной и проведение переговоров о возможном заключении договора.</p><p><b>Действия:</b> сбор, запись, систематизация, накопление, хранение, уточнение, извлечение, использование, предоставление [перечислить обработчиков, если есть], блокирование, удаление и уничтожение; обработка автоматизированным и неавтоматизированным способами.</p><p>Согласие действует [указать срок] либо до его отзыва. Отозвать согласие можно письмом на [privacy@company.ru]. Оператор прекращает обработку и уничтожает данные в установленные законом сроки, если отсутствуют иные законные основания для обработки.</p><p><b>Перед публикацией:</b> заполните сведения об операторе, срок, способ отзыва и перечень обработчиков. Текст согласия должен соответствовать фактической обработке.</p>`
};
const dialog = document.querySelector('#legal-modal');
const modalContent = document.querySelector('#modal-content');
document.querySelectorAll('[data-modal]').forEach(btn => btn.addEventListener('click', () => { modalContent.innerHTML = legal[btn.dataset.modal]; dialog.showModal(); }));
document.querySelector('.modal-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

const cookie = document.querySelector('#cookie');
const analytics = document.querySelector('#analytics-cookie');
function showCookies(){ const saved = localStorage.getItem('cookie-choice'); if(saved){ analytics.checked = saved === 'analytics'; } else cookie.hidden = false; }
function saveCookies(value){ localStorage.setItem('cookie-choice', value); analytics.checked = value === 'analytics'; cookie.hidden = true; /* Подключайте аналитику здесь только при value === 'analytics'. */ }
document.querySelector('#cookie-save').addEventListener('click', () => saveCookies(analytics.checked ? 'analytics' : 'essential'));
document.querySelector('#cookie-essential').addEventListener('click', () => saveCookies('essential'));
document.querySelector('#cookie-settings').addEventListener('click', () => cookie.hidden = false);
showCookies();

const form = document.querySelector('#contact-form');
form.addEventListener('submit', e => {
  e.preventDefault(); let valid = true;
  form.querySelectorAll('[required]').forEach(field => { const holder = field.closest('label'); const error = holder?.querySelector('.error'); if(!field.checkValidity()){ valid=false; field.setAttribute('aria-invalid','true'); if(error) error.textContent='Заполните это поле'; } else { field.removeAttribute('aria-invalid'); if(error) error.textContent=''; } });
  const status = form.querySelector('.form-status');
  if(!valid){ status.textContent='Проверьте заполнение формы и отдельное согласие.'; return; }
  status.textContent='Демо-форма заполнена. Подключите российский сервер обработки перед публикацией.';
});
