// // Асинхронная функция fetch() для получения данных из JSON
// async function getProducts() {
//   const response = await fetch("../assets/products.json");
//   const productsData = await response.json();

//   // Получаем контейнер для карточек
//   const productsContainer = document.querySelector('#products-menu');

//   // Функция для отображения продуктов по выбранной категории
//   function displayProducts(category) {
//     // Очищаем контейнер перед загрузкой новых продуктов
//     productsContainer.innerHTML = '';

//     // Фильтруем продукты по категории
//     const filteredProducts = productsData.filter(product => product.category === category);

//     // Вставляем карточки в контейнер
//     filteredProducts.forEach(product => {
//       const productCard = `
//         <li class="products__items">
//           <a href="#" class="products__link">
//             <div class="products__image">
//               <img src="${product.image}" alt="${product.name}">
//             </div>
//             <div class="products__info flex">
//               <h3 class="products__subtitle">${product.name}</h3>
//               <p class="products__descr">${product.description}</p>
//               <span class="products__price">$${product.price}</span>
//             </div>
//           </a>
//         </li>
//       `;

//       productsContainer.innerHTML += productCard;
//     });
//   }

//   // Получаем список кнопок категорий
//   const categoryButtons = document.querySelectorAll('.products__btn');

//   // Добавляем обработчик события для каждой кнопки категории
//   categoryButtons.forEach(button => {
//     button.addEventListener('click', function () {
//       // Удаляем класс активности у всех кнопок
//       categoryButtons.forEach(btn => btn.classList.remove('products__btn--active'));

//       // Добавляем класс активности только для текущей кнопки
//       button.classList.add('products__btn--active');

//       // Получаем значение категории из атрибута data-category
//       const category = button.dataset.category;

//       // Отображаем продукты по выбранной категории
//       displayProducts(category);
//     });
//   });
//   // Первоначальная загрузка продуктов с активной категорией "coffee"
//   displayProducts('coffee');
// }

// // Вызываем функцию для получения и отображения продуктов
// getProducts();


// document.getElementById('show-more').addEventListener('click', function() {
//   // Получаем все элементы с классом 'element'
//   var elements = document.querySelectorAll('.products__items');

//   // Добавляем класс 'active' к каждому элементу
//   elements.forEach(function(element) {
//     element.classList.add('visibles');
//   });

//   // Исчезаем кнопку
//   this.style.display = 'none';
// });


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
          <a href="#" class="products__link">
            <div class="products__image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="products__info flex">
              <h3 class="products__subtitle">${product.name}</h3>
              <p class="products__descr">${product.description}</p>
              <span class="products__price">$${product.price}</span>
            </div>
          </a>
        </li>
      `;

      productsContainer.innerHTML += productCard;
    });

    // Показываем кнопку "Показать еще" после загрузки карточек
    document.getElementById('show-more').style.display = 'flex';
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
