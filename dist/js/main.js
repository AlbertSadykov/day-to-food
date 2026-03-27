document.addEventListener('DOMContentLoaded', () => {
  console.log('Gulp starter loaded');
});

AOS.init({
    once: true, // Анимация сработает только один раз
    duration: 800, // Скорость анимации (в мс)
    offset: 100, // На сколько пикселей раньше должен начаться скролл
  });