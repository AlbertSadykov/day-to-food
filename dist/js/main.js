document.addEventListener('DOMContentLoaded', () => {
  console.log('Gulp starter loaded');
});

// Оборачиваем всё в DOMContentLoaded, чтобы элементы точно существовали
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация AOS
    AOS.init({
        once: true,
        duration: 800,
        offset: 100,
    });

    // 2. Данные меню
    const menuDatabase = {
        home: {
            title: "Домашнее меню",
            prices: { 7: "15 900", 28: "58 000" },
            dishes: [
                { type: "Завтрак", name: "Овсяная каша с курагой", img: "images/dish1.png" },
                { type: "Обед", name: "Куриный суп лапша", img: "images/dish2.png" },
                { type: "Ужин", name: "Отбивная с рисом", img: "images/dish3.png" }
            ]
        },
        health: {
            title: "Правильное питание",
            prices: { 7: "19 500", 28: "65 000" },
            // ВАЖНО: Добавил данные сюда, иначе при пустом массиве ничего не отрендерится
            1600: [
                { type: "Завтрак", name: "Смузи-боул", img: "images/dish_h1.png" },
                { type: "Обед", name: "Салат с нутом", img: "images/dish_h2.png" }
            ],
            2500: [
                { type: "Завтрак", name: "Омлет с лососем", img: "images/dish4.png" },
                { type: "Обед", name: "Индейка с киноа", img: "images/dish5.png" },
                { type: "Ужин", name: "Стейк из тунца", img: "images/dish6.png" }
            ]
        }
    };

    let state = {
        program: 'home',
        calories: '1600',
        day: 0,
        duration: 7
    };

    // 3. Функция рендера
    function render() {
        const container = document.getElementById('food-render');
        const calWrap = document.getElementById('calories-wrap');
        const progName = document.getElementById('current-program-name');
        const priceTag = document.getElementById('new-price');

        if (!container || !progName || !priceTag) return; // Защита от ошибок

        // Показываем селектор калорий только для ПП
        if (calWrap) {
            calWrap.style.display = state.program === 'health' ? 'flex' : 'none';
        }
        
        const currentProg = menuDatabase[state.program];
        progName.innerText = currentProg.title;
        priceTag.innerText = currentProg.prices[state.duration] + ' тг';

        // Определяем источник блюд
        const source = state.program === 'home' ? currentProg.dishes : currentProg[state.calories];
        
        if (source && source.length > 0) {
            container.innerHTML = source.map(dish => `
                <div class="dish-card" data-aos="zoom-in">
                    <img src="${dish.img}" class="dish-card__img" alt="${dish.name}">
                    <p class="dish-card__type">${dish.type}</p>
                    <h5 class="dish-card__name">${dish.name}</h5>
                </div>
            `).join('');
            
            // КРИТИЧНО: AOS должен пересчитать позиции после вставки нового HTML
            AOS.refresh(); 
        } else {
            container.innerHTML = '<p>В этой программе пока нет блюд</p>';
        }
    }

    // 4. Слушатели для табов программ
    document.querySelectorAll('.programs__tab').forEach(btn => {
        btn.onclick = () => {
            const activeTab = document.querySelector('.programs__tab.active');
            if (activeTab) activeTab.classList.remove('active');
            
            btn.classList.add('active');
            state.program = btn.dataset.program;
            render();
        };
    });

    // 5. Слушатели для длительности (7/28 дней)
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.onclick = () => {
            const activeToggle = document.querySelector('.toggle-btn.active');
            if (activeToggle) activeToggle.classList.remove('active');
            
            btn.classList.add('active');
            state.duration = btn.dataset.duration;
            render();
        };
    });

    // 6. Логика FAQ (Табы + Аккордеон)
    const faqTabs = document.querySelectorAll('.faq__tab');
    const faqContents = document.querySelectorAll('.faq__content');

    faqTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                faqTabs.forEach(t => t.classList.remove('active'));
                faqContents.forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                targetContent.classList.add('active');
            }
        });
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-item__header');
        header.addEventListener('click', () => {
            const parent = item.closest('.faq__content');
            // Закрываем другие вопросы только внутри текущего таба
            parent.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // Стартовый запуск
    render(); 
});



// Используем правильные классы: .about-tabs__btn вместо .features-tabs__btn
document.querySelectorAll('.about-tabs__btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Ищем ближайший общий контейнер (в твоем случае это .about-us или .section)
        const parent = btn.closest('.about-us'); 
        
        if (!parent) return; // Защита от ошибок

        // Убираем активные классы у кнопок внутри этого блока
        parent.querySelectorAll('.about-tabs__btn').forEach(b => b.classList.remove('active'));
        
        // Скрываем все блоки контента внутри этого блока
        parent.querySelectorAll('.about-tabs__content').forEach(c => c.classList.remove('active'));

        // Добавляем активный класс нажатой кнопке
        btn.classList.add('active');
        
        // Находим целевой контент по ID из data-target
        const targetId = btn.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        
        if (targetContent) {
            targetContent.classList.add('active');
        }
        
        // Обновляем AOS, чтобы он "увидел" появившийся контент
        AOS.refresh();
    });
});