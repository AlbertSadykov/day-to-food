// Оборачиваем всё в DOMContentLoaded, чтобы элементы точно существовали
document.addEventListener("DOMContentLoaded", () => {
  // 1. Инициализация AOS
  AOS.init({
    once: true,
    duration: 800,
    offset: 100,
  });

  // 6. Логика FAQ (Табы + Аккордеон)
  const faqTabs = document.querySelectorAll(".faq__tab");
  const faqContents = document.querySelectorAll(".faq__content");

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
      }
    });
  });

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const header = item.querySelector(".faq-item__header");
    header.addEventListener("click", () => {
      const parent = item.closest(".faq__content");
      // Закрываем другие вопросы только внутри текущего таба
      parent.querySelectorAll(".faq-item").forEach((other) => {
        if (other !== item) other.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });

  // Стартовый запуск
  render();
});

// Используем правильные классы: .about-tabs__btn вместо .features-tabs__btn
document.querySelectorAll(".about-tabs__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Ищем ближайший общий контейнер (в твоем случае это .about-us или .section)
    const parent = btn.closest(".about-us");

    if (!parent) return; // Защита от ошибок

    // Убираем активные классы у кнопок внутри этого блока
    parent
      .querySelectorAll(".about-tabs__btn")
      .forEach((b) => b.classList.remove("active"));

    // Скрываем все блоки контента внутри этого блока
    parent
      .querySelectorAll(".about-tabs__content")
      .forEach((c) => c.classList.remove("active"));

    // Добавляем активный класс нажатой кнопке
    btn.classList.add("active");

    // Находим целевой контент по ID из data-target
    const targetId = btn.getAttribute("data-target");
    const targetContent = document.getElementById(targetId);

    if (targetContent) {
      targetContent.classList.add("active");
    }

    // Обновляем AOS, чтобы он "увидел" появившийся контент
    AOS.refresh();
  });
});



document.addEventListener('DOMContentLoaded', () => {
    // Данные меню
    const menuDatabase = {
        home: {
            title: "Домашнее меню",
            prices: { "7": "15 900", "28": "58 000" },
            oldPrices: { "7": "27 000", "28": "70 000" },
            dishes: [
                { type: "Завтрак", name: "Овсяная каша с курагой", img: "images/Овсяная каша 1.png" },
                { type: "Обед", name: "Куриный суп лапша", img: "images/freepik__background__2271 1.png" },
                { type: "Ужин", name: "Куриная отбивная с рисом", img: "images/freepik__background__2272 1.png" }
            ]
        },
        health: {
            title: "Правильное питание",
            prices: { "7": "19 500", "28": "65 000" },
            oldPrices: { "7": "30 000", "28": "80 000" },
            "1600": [
                { type: "Завтрак", name: "Смузи-боул", img: "images/Овсяная каша 1.png" }, // Замени пути на свои
                { type: "Обед", name: "Салат с нутом", img: "images/freepik__background__2271 1.png" }
            ],
            "2500": [
                { type: "Завтрак", name: "Омлет с лососем", img: "images/Овсяная каша 1.png" },
                { type: "Обед", name: "Индейка с киноа", img: "images/freepik__background__2271 1.png" },
                { type: "Ужин", name: "Стейк из тунца", img: "images/freepik__background__2272 1.png" }
            ]
        }
    };

    // Состояние приложения
    let state = {
        program: "home",
        calories: "2500",
        duration: "7"
    };

    // Основная функция рендера
    function render() {
        const container = document.getElementById("food-render");
        const calWrap = document.getElementById("calories-wrap");
        const progName = document.getElementById("current-program-name");
        const priceTag = document.getElementById("new-price");
        const oldPriceTag = document.getElementById("old-price");

        if (!container) return;

        // Показываем селектор калорий только для ПП
        if (calWrap) {
            calWrap.style.display = state.program === "health" ? "flex" : "none";
        }

        const currentProg = menuDatabase[state.program];
        
        // Обновляем текст в сайдбаре
        if(progName) progName.innerText = currentProg.title;
        if(priceTag) priceTag.innerText = currentProg.prices[state.duration] + " тг";
        if(oldPriceTag) oldPriceTag.innerText = currentProg.oldPrices[state.duration] + " тг";

        // Определяем источник блюд (если home - берем dishes, если health - берем по калориям)
        const source = state.program === "home" ? currentProg.dishes : currentProg[state.calories];

        // Рендерим карточки с твоими классами food-card
        if (source && source.length > 0) {
            container.innerHTML = source.map(dish => `
                <div class="food-card">
                    <img src="${dish.img}" alt="${dish.type}" class="food-card__img" />
                    <span class="food-card__tag">${dish.type}</span>
                    <p class="food-card__title">${dish.name}</p>
                </div>
            `).join("");
        } else {
            container.innerHTML = "<p style='color: #2b4216; font-family: Montserrat;'>Меню формируется</p>";
        }
    }

    // Слушатели для табов программ (Домашнее / ПП)
    document.querySelectorAll(".programs__tab").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".programs__tab.active")?.classList.remove("active");
            btn.classList.add("active");
            state.program = btn.dataset.program;
            render();
        });
    });

    // Слушатели для калорий (1600 / 2500)
    document.querySelectorAll(".cal-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".cal-btn.active")?.classList.remove("active");
            btn.classList.add("active");
            state.calories = btn.dataset.calories;
            render();
        });
    });

    // Слушатели для длительности (7 / 28 дней)
    document.querySelectorAll(".duration-toggle__btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".duration-toggle__btn.active")?.classList.remove("active");
            btn.classList.add("active");
            state.duration = btn.dataset.duration;
            render();
        });
    });

    // Визуальное переключение дней недели (пока без смены данных)
    document.querySelectorAll(".day-link").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".day-link.active")?.classList.remove("active");
            btn.classList.add("active");
        });
    });

    // Инициализация при загрузке
    render();
});