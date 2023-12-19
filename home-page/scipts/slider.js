let shiftSlide = 0;
const sliderContainer = document.querySelector('.coffee__slider-wrapper');

// Функция для переключения слайдов
function showSlide(slideSide) {
  if (slideSide === 'next') {
    shiftSlide = shiftSlide + 100;
    if (shiftSlide > 200) {
      shiftSlide = 0;
    }
  } else if (slideSide === 'prev') {
    shiftSlide = shiftSlide - 100;
    if (shiftSlide < 0) {
      shiftSlide = 200;
    }
  }

  sliderContainer.style.left = -shiftSlide + '%'
};

// Функция для автоматического переключения слайдов
function autoSlides() {
  showSlide('next');
}

// Интервал для переключения слайдов каждые 7 секунд
let timeInterval = setInterval(autoSlides, 7000);

// Сброс таймера
function resetTime() {
  clearInterval(timeInterval);
  // Новый интервал
  timeInterval = setInterval(autoSlides, 7000);
}

document.querySelector('#prev').addEventListener('click', () => {
  showSlide('prev');
  resetTime();
});

document.querySelector('#next').addEventListener('click', () => {
  showSlide('next');
  resetTime();
});

console.log('Если вы увидели эту надпись, значит скрипт прогрузился. Пожалуйста дождитесь загрузки HTML')
