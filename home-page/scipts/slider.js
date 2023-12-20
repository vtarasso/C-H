let shiftSlide = 0;
const sliderContainer = document.querySelector('.coffee__slider-wrapper');
const paginationLines = document.querySelectorAll('.pagination__line');
const slider = document.querySelector('.coffee__slider');

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
  const activeIndex = shiftSlide / 100;
  const activeLine = paginationLines[activeIndex].querySelector('.pagination__line--active');
// нужно будет переделать, чтобы при наведении останавливалась полоса загрузки и потом продолжалась
  if (activeLine && activeLine.offsetWidth === activeLine.scrollWidth) {
    showSlide('next');
  }
}

// Начинаем автоматическое переключение слайдов сразу после загрузки страницы
updatePagination(0); // Установка начального активного слайда
// Интервал для переключения слайдов каждые 7 секунд
let timeInterval = setInterval(autoSlides, 7000);

// плохо отрабатывает при наведении, если пройти по всем слайдам, то потом они перестают сами переключатся
// // Обработчик события для остановки переключения при наведении мыши
// slider.addEventListener('mouseenter', () => {
//   clearInterval(timeInterval);
//   updatePagination(shiftSlide / 100);
// });

// // Обработчик события для возобновления переключения после ухода мыши
// slider.addEventListener('mouseleave', () => {
//   autoSlides();
//   // Обновляем пагинацию
// });


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

// swipe to slide

// Переменные для отслеживания начальной и конечной координаты X при касании
let touchStartX = 0;
let touchEndX = 0;

// Слушатель события touchstart: сохраняет начальную координату X при касании
slider.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

// Слушатель события touchmove: сохраняет текущую координату X при движении пальца
slider.addEventListener('touchmove', (e) => {
  touchEndX = e.touches[0].clientX;
});

// Слушатель события touchend: вызывает функцию handleSwipe() при отрыве пальца от экрана
slider.addEventListener('touchend', () => {
  handleSwipe();
});

// Функция для обработки свайпа
function handleSwipe() {
  const swipeThreshold = 50; // Порог для определения свайпа

  const deltaX = touchEndX - touchStartX; // Разница между начальной и конечной координатами X

  // Проверка направления свайпа и вызов соответствующих функций
  if (deltaX > swipeThreshold) {
    // Свайп влево
    showSlide('prev');
    resetTime();
  } else if (deltaX < -swipeThreshold) {
    // Свайп вправо
    showSlide('next');
    resetTime();
  }
}

// Добавляем событие на изменение размера окна (например, поворот устройства)
window.addEventListener('resize', handleSwipe);
