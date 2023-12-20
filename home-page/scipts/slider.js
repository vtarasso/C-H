let shiftSlide = 0;
const sliderContainer = document.querySelector('.coffee__slider-wrapper');
const paginationLines = document.querySelectorAll('.pagination__line');

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

  sliderContainer.style.left = -shiftSlide + '%';

  // Обновляем активные линии
  const activeIndex = shiftSlide / 100;
  updatePagination(activeIndex);
}

// Функция для заполнения пагинации
function updatePagination(activeIndex) {
  paginationLines.forEach((line, index) => {
    const isActive = index === activeIndex;
    const activeLine = line.querySelector('.pagination__line--active');

    if (isActive) {
      activeLine.classList.add('filled');
    } else {
      activeLine.classList.remove('filled');
    }
  });
}

// Функция для автоматического переключения слайдов
function autoSlides() {
  showSlide('next');
}

// Начинаем автоматическое переключение слайдов сразу после загрузки страницы
updatePagination(0); // Установка начального активного слайда
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