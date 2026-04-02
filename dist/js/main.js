document.addEventListener('DOMContentLoaded', () => {
  console.log('Gulp starter loaded');
});

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
       1. ИНИЦИАЛИЗАЦИЯ AOS
       ========================================================================== */
  AOS.init({
    once: true,
    duration: 800,
    offset: 100,
  });

  /* ==========================================================================
       2. ЛОГИКА FAQ (ТАБЫ + АККОРДЕОН)
       ========================================================================== */
  const initFAQ = () => {
    const faqTabs = document.querySelectorAll(".faq__tab");
    const faqContents = document.querySelectorAll(".faq__content");
    const faqItems = document.querySelectorAll(".faq-item");

    // Переключение табов в FAQ
    faqTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = tab.getAttribute("data-target");
        const targetContent = document.getElementById(targetId);

        if (targetContent) {
          faqTabs.forEach((t) => t.classList.remove("active"));
          faqContents.forEach((c) => c.classList.remove("active"));
          tab.classList.add("active");
          targetContent.classList.add("active");
          AOS.refresh();
        }
      });
    });

    // Аккордеон (раскрытие вопросов)
    faqItems.forEach((item) => {
      const header = item.querySelector(".faq-item__header");
      header.addEventListener("click", () => {
        const parent = item.closest(".faq__content");
        // Закрываем другие открытые вопросы в текущем табе
        parent.querySelectorAll(".faq-item").forEach((other) => {
          if (other !== item) other.classList.remove("active");
        });
        item.classList.toggle("active");
      });
    });
  };

  /* ==========================================================================
       3. ТАБЫ "О НАС" (ABOUT US)
       ========================================================================== */
  const initAboutTabs = () => {
    const aboutBtns = document.querySelectorAll(".about-tabs__btn");

    aboutBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const parent = btn.closest(".about-us");
        if (!parent) return;

        const targetId = btn.getAttribute("data-target");
        const targetContent = document.getElementById(targetId);

        if (targetContent) {
          // Чистим активные классы
          parent
            .querySelectorAll(".about-tabs__btn")
            .forEach((b) => b.classList.remove("active"));
          parent
            .querySelectorAll(".about-tabs__content")
            .forEach((c) => c.classList.remove("active"));

          // Активируем нужные
          btn.classList.add("active");
          targetContent.classList.add("active");

          AOS.refresh();
        }
      });
    });
  };

  /* ==========================================================================
   4. КОНФИГУРАТОР ПРОГРАММ (МЕНЮ)
   ========================================================================== */
  const initProgramConfigurator = () => {
    const menuDatabase = {
      home: {
        title: "Домашнее меню",
        prices: { 7: "15 900", 28: "58 000" },
        oldPrices: { 7: "27 000", 28: "70 000" },
        // Массив из 7 дней, в каждом дне свой набор блюд
        days: [
          // ПН (0)
          [
            {
              type: "Завтрак",
              name: "Овсяная каша (ПН)",
              img: "images/dish-1.png",
            },
            { type: "Обед", name: "Суп лапша", img: "images/dish-2.png" },
            { type: "Ужин", name: "Отбивная", img: "images/dish-3.png" },
          ],
          // ВТ (1)
          [
            { 
              
              type: "Завтрак", name: "Скрембл (ВТ)", img: "images/dish-2.png" 


            },
            { type: "Обед", name: "Борщ", img: "images/dish-3.png" },
            { type: "Ужин", name: "Рыба", img: "images/dish-1.png" },
          ],
          // СР (2)
          [
            { type: "Завтрак", name: "Блины (СР)", img: "images/dish-3.png" },
            { type: "Обед", name: "Рассольник", img: "images/dish-1.png" },
            { type: "Ужин", name: "Плов", img: "images/dish-2.png" },
          ],
          // ЧТ (3)
          [
            { type: "Завтрак", name: "Каша (ЧТ)", img: "images/dish-1.png" },
            { type: "Обед", name: "Уха", img: "images/dish-2.png" },
            { type: "Ужин", name: "Котлеты", img: "images/dish-3.png" },
          ],
          // ПТ (4)
          [
            { type: "Завтрак", name: "Омлет (ПТ)", img: "images/dish-2.png" },
            { type: "Обед", name: "Солянка", img: "images/dish-3.png" },
            { type: "Ужин", name: "Паста", img: "images/dish-1.png" },
          ],
          // СБ (5)
          [
            { type: "Завтрак", name: "Сырники (СБ)", img: "images/dish-3.png" },
            { type: "Обед", name: "Харчо", img: "images/dish-1.png" },
            { type: "Ужин", name: "Мясо гриль", img: "images/dish-2.png" },
          ],
          // ВС (6)
          [
            { type: "Завтрак", name: "Яичница (ВС)", img: "images/dish-1.png" },
            { type: "Обед", name: "Крем-суп", img: "images/dish-2.png" },
            { type: "Ужин", name: "Запеканка", img: "images/dish-3.png" },
          ],
        ],
      },
      health: {
        title: "Правильное питание",
        prices: { 7: "19 500", 28: "65 000" },
        oldPrices: { 7: "30 000", 28: "80 000" },
        // Для ПП данные делятся на калории, а внутри — на дни
        1600: [
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 1600 (ПН)",
              img: "images/dish-1.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-2.png" },
          ],
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 1600 (ВТ)",
              img: "images/dish-2.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-3.png" },
          ],
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 1600 (СР)",
              img: "images/dish-3.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-1.png" },
          ],
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 1600 (ЧТ)",
              img: "images/dish-1.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-2.png" },
          ],
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 1600 (ПТ)",
              img: "images/dish-2.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-3.png" },
          ],
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 1600 (СБ)",
              img: "images/dish-3.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-1.png" },
          ],
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 1600 (ВС)",
              img: "images/dish-1.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-2.png" },
          ],
        ],
        2500: [
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 2500 (ПН)",
              img: "images/dish-3.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-2.png" },
            { type: "Ужин", name: "ПП Ужин", img: "images/dish-1.png" },
          ],
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 2500 (ВТ)",
              img: "images/dish-1.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-3.png" },
            { type: "Ужин", name: "ПП Ужин", img: "images/dish-2.png" },
          ],
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 2500 (СР)",
              img: "images/dish-2.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-1.png" },
            { type: "Ужин", name: "ПП Ужин", img: "images/dish-3.png" },
          ],
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 2500 (ЧТ)",
              img: "images/dish-3.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-2.png" },
            { type: "Ужин", name: "ПП Ужин", img: "images/dish-1.png" },
          ],
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 2500 (ПТ)",
              img: "images/dish-1.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-3.png" },
            { type: "Ужин", name: "ПП Ужин", img: "images/dish-2.png" },
          ],
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 2500 (СБ)",
              img: "images/dish-2.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-1.png" },
            { type: "Ужин", name: "ПП Ужин", img: "images/dish-3.png" },
          ],
          [
            {
              type: "Завтрак",
              name: "ПП Завтрак 2500 (ВС)",
              img: "images/dish-3.png",
            },
            { type: "Обед", name: "ПП Обед", img: "images/dish-2.png" },
            { type: "Ужин", name: "ПП Ужин", img: "images/dish-1.png" },
          ],
        ],
      },
    };

    let state = {
      program: "home",
      calories: "2500",
      duration: "7",
      day: 1, // По умолчанию Понедельник
    };

    const renderMenu = () => {
      const container = document.getElementById("food-render");
      const calWrap = document.getElementById("calories-wrap");
      const progName = document.getElementById("current-program-name");
      const priceTag = document.getElementById("new-price");
      const oldPriceTag = document.getElementById("old-price");

      if (!container) return;

      const currentProg = menuDatabase[state.program];

      // UI: Показ/скрытие калорий
      if (calWrap)
        calWrap.style.display = state.program === "health" ? "flex" : "none";

      // UI: Обновление текстов и цен
      if (progName) progName.innerText = currentProg.title;
      if (priceTag)
        priceTag.innerText = currentProg.prices[state.duration] + " тг";
      if (oldPriceTag)
        oldPriceTag.innerText = currentProg.oldPrices[state.duration] + " тг";

      // Определяем источник блюд с учетом текущего дня
      const source =
        state.program === "home"
          ? currentProg.days[state.day]
          : currentProg[state.calories][state.day];

      if (source && source.length > 0) {
        container.innerHTML = source
          .map(
            (dish) => `
                <div class="food-card" data-aos="fade">
                    <img src="${dish.img}" alt="${dish.type}" class="food-card__img" />
                    <span class="food-card__tag">${dish.type}</span>
                    <p class="food-card__title">${dish.name}</p>
                </div>
            `,
          )
          .join("");
        AOS.refresh();
      } else {
        container.innerHTML = "<p>На этот день меню еще не составлено.</p>";
      }
    };

    // Слушатели для программ
    document.querySelectorAll(".programs__tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelector(".programs__tab.active")
          ?.classList.remove("active");
        btn.classList.add("active");
        state.program = btn.dataset.program;
        renderMenu();
      });
    });

    // Слушатели для калорий
    document.querySelectorAll(".cal-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelector(".cal-btn.active")?.classList.remove("active");
        btn.classList.add("active");
        state.calories = btn.dataset.calories;
        renderMenu();
      });
    });

    // Слушатели для длительности
    document.querySelectorAll(".duration-toggle__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelector(".duration-toggle__btn.active")
          ?.classList.remove("active");
        btn.classList.add("active");
        state.duration = btn.dataset.duration;
        renderMenu();
      });
    });

    // Слушатели для дней недели
    document.querySelectorAll(".day-link").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        document.querySelector(".day-link.active")?.classList.remove("active");
        btn.classList.add("active");

        state.day = index; // Используем индекс кнопки (0-6) как текущий день
        renderMenu();
      });
    });

    renderMenu();
  };
  

  

  /* ==========================================================================
       ЗАПУСК ВСЕХ МОДУЛЕЙ
       ========================================================================== */
  initFAQ();
  initAboutTabs();
  initProgramConfigurator();
});



document.addEventListener('DOMContentLoaded', () => {
    // Кнопка бургера в шапке сайта
    const burgerOpen = document.querySelector('.header__burger'); 
    // Новый крестик внутри меню
    const burgerClose = document.getElementById('mobile-menu-close'); 
    // Само выпадающее меню
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    if (!burgerOpen || !burgerClose || !mobileMenu) return;

    // Открытие
    burgerOpen.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden'; // Убираем скролл сайта
    });

    // Закрытие по крестику
    burgerClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        body.style.overflow = ''; // Возвращаем скролл
    });

    // Закрытие при клике на любую ссылку в меню
    const links = mobileMenu.querySelectorAll('.mobile-menu__link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('private-house-check');
  const extraFields = document.getElementById('delivery-extra-fields');

  if (checkbox && extraFields) {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        extraFields.classList.add('is-hidden');
      } else {
        extraFields.classList.remove('is-hidden');
      }
    });
  }
});



document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('login-modal');
    // Предполагаю, у тебя в хедере есть кнопка с классом
    const openBtn = document.querySelector('.btn-login-open'); 
    const closeBtn = modal.querySelector('.modal__close');
    const overlay = modal.querySelector('.modal__overlay');

    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл сайта
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Слушатели
    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    // Логика глаза пароля (опционально)
    const eyeBtn = modal.querySelector('.input-group__eye-toggle');
    const passwordInput = modal.querySelector('.input-group--password input');
    
    if (eyeBtn && passwordInput) {
        eyeBtn.addEventListener('click', function() {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            this.querySelector('i').classList.toggle('ri-eye-line');
            this.querySelector('i').classList.toggle('ri-eye-off-line');
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.modal-auth__form');
  const title = document.querySelector('.js-modal-title');
  const submitBtn = document.querySelector('.js-submit-btn');
  
  // Поля
  const regFields = document.querySelector('.js-reg-only');
  const emailField = document.querySelector('.js-email-field');
  const passField = document.querySelector('.js-password-field');

  // Ссылки переключения
  const toRegBtn = document.querySelector('.js-switch-to-reg');
  const toForgotBtn = document.querySelector('.js-switch-to-forgot');
  const toLoginBtn = document.querySelector('.js-switch-to-login');

  // Функция для сброса всех состояний
  const hideAll = () => {
    [regFields, emailField, passField, toRegBtn, toForgotBtn, toLoginBtn].forEach(el => el.style.display = 'none');
  };

  // Режим Регистрации
  toRegBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hideAll();
    title.textContent = 'Регистрация';
    submitBtn.textContent = 'Зарегистрироваться';
    
    regFields.style.display = 'flex';
    regFields.style.gap = '25px';
    emailField.style.display = 'flex';
    passField.style.display = 'flex';
    toLoginBtn.style.display = 'block';
  });

  // Режим Забыли пароль
  toForgotBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hideAll();
    title.textContent = 'Восстановление пароля';
    submitBtn.textContent = 'Отправить код';
    
    emailField.style.display = 'none';
    toLoginBtn.style.display = 'block';
  });

  // Режим Логина (возврат)
  toLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hideAll();
    title.textContent = 'Авторизуйтесь, чтобы продолжить';
    submitBtn.textContent = 'Войти';
    
    passField.style.display = 'flex';
    toRegBtn.style.display = 'block';
    toForgotBtn.style.display = 'block';
  });
});