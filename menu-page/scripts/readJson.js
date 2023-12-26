// Асинхронная функция fetch() для получения данных из JSON
async function getProducts() {
  const response = await fetch("../assets/products.json");
  const productsData = await response.json();

  // Получаем контейнер для карточек
  const productsContainer = document.querySelector('#products-menu');

  // Переменная для хранения текущей активной категории
  let currentCategory = 'coffee';

  // Функция для отображения продуктов по выбранной категории
  function displayProducts(category) {
    // Обновляем текущую активную категорию
    currentCategory = category;

    // Очищаем контейнер перед загрузкой новых продуктов
    productsContainer.innerHTML = '';

    // Фильтруем продукты по категории
    const filteredProducts = productsData.filter(product => product.category === category);

    // Вставляем карточки в контейнер
    filteredProducts.forEach(product => {
      const productCard = `
        <li class="products__items">
          <div class="products__link pop-up-open">
            <div class="products__image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="products__info flex">
              <h3 class="products__subtitle">${product.name}</h3>
              <p class="products__descr">${product.description}</p>
              <span class="products__price">$${product.price}</span>
            </div>
          </div>
        </li>
      `;

      productsContainer.innerHTML += productCard;
    });

    // Добавляем обработчик события для каждого элемента с классом 'products__items'
    document.querySelectorAll('.products__items').forEach(item => {
      item.addEventListener('click', function () {
        // Получаем индекс элемента
        const index = Array.from(this.parentNode.children).indexOf(this);

        // Отображаем модальное окно с информацией о продукте с соответствующим индексом
        displayModal(filteredProducts[index]);
      });
    });

    // Функция для отображения модального окна с информацией о продукте
    function displayModal(product) {
      const popup = document.getElementById('pop-up');
      const popupContainer = popup.querySelector('.pop-up__container');

      // Заполняем контент модального окна данными из продукта
      popupContainer.innerHTML = `
        <div class="pop-up__picture">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="pop-up__content">
          <div class="pop-up__info">
            <h3 class="products__subtitle">${product.name}</h3>
            <p class="products__descr">${product.description}</p>
          </div>
          <div class="pop-up__size">
            <h4 class="pop-up__subtitle">Size</h4>
            ${Object.keys(product.sizes).map(size => `<p>${size}: ${product.sizes[size].size}</p>`).join('')}
          </div>
          <div class="pop-up__additives">
            <h4 class="pop-up__subtitle">Additives</h4>
            ${product.additives.map(additive => `<p>${additive.name}: +$${additive['add-price']}</p>`).join('')}
          </div>
        </div>
        <div class="pop-up__cost">
          <h3 class="pop-up__total">Total:</h3>
          <p class="pop-up__price">$ ${product.price}</p>
        </div>
        <p class="pop-up__alert">
          The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
        </p>
        <button class="pop-up__btn" id="pop-up-close">Close</button>
      `;

      // Показываем модальное окно
      popup.style.display = 'flex';

      // Добавляем обработчик события для кнопки "Close"
      document.getElementById('pop-up-close').addEventListener('click', function () {
        // Закрываем модальное окно
        popup.style.display = 'none';
      });

      // Когда пользователь щелкает в любом месте за пределами модального, закройте его
      window.onclick = function(event) {
        if (event.target == popup) {
          popup.style.display = "none";
        }
      }
    }

    // Функция, которая будет отображать или скрывать кнопку "Показать еще" в зависимости от ширины экрана
    function showMoreButtonBasedOnScreenWidth() {
      var showMoreButton = document.getElementById('show-more');
      
      // Получаем ширину окна
      var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      // Определяем пороговое значение ширины, при котором кнопка будет видна
      var thresholdWidth = 965;

      // Если ширина окна меньше порогового значения, показываем кнопку, иначе скрываем
      if (windowWidth < thresholdWidth) {
        showMoreButton.style.display = 'flex';
      } else {
        showMoreButton.style.display = 'none';
      }
    }

    // Вызываем функцию при загрузке страницы и при изменении размера окна
    window.onload = showMoreButtonBasedOnScreenWidth;
    window.onresize = showMoreButtonBasedOnScreenWidth;

    // Показываем кнопку "Показать еще" после загрузки карточек, если ширина экрана меньше 965 пикселей
    showMoreButtonBasedOnScreenWidth();
    // // Показываем кнопку "Показать еще" после загрузки карточек
    // document.getElementById('show-more').style.display = 'flex';
  }

  // Получаем список кнопок категорий
  const categoryButtons = document.querySelectorAll('.products__btn');

  // Добавляем обработчик события для каждой кнопки категории
  categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Удаляем класс активности у всех кнопок
      categoryButtons.forEach(btn => btn.classList.remove('products__btn--active'));

      // Добавляем класс активности только для текущей кнопки
      button.classList.add('products__btn--active');

      // Получаем значение категории из атрибута data-category
      const category = button.dataset.category;

      // Отображаем продукты по выбранной категории
      displayProducts(category);
    });
  });

  // Добавляем обработчик события для кнопки "Показать еще"
  document.getElementById('show-more').addEventListener('click', function() {
    // Получаем все элементы с классом 'element'
    var elements = document.querySelectorAll('.products__items');

    // Добавляем класс 'visibles' к каждому элементу
    elements.forEach(function(element) {
      element.classList.add('visibles');
    });

    // Скрываем кнопку "Показать еще"
    this.style.display = 'none';
  });

  // Вызываем функцию для первоначальной загрузки продуктов с активной категорией "coffee"
  displayProducts(currentCategory);
}

// Вызываем функцию для получения и отображения продуктов
getProducts();

