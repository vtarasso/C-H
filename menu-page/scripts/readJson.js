// Асинхронная функция fetch() для получения данных из JSONки
async function getProducts() {
  const response = await fetch("../assets/products.json");
  const productsData = await response.json();

  // Получаем обертку(контейнер) из хтмл для карточек
  const productsContainer = document.querySelector('#products-menu');


  for (let order in productsData) {
    // Структура карточек для списка
    const productCards = `
      <li class="products__items">
        <a href="#" class="products__link">
          <div class="products__image">
            <img src="${productsData[order].image}" alt="${productsData[order].name}">
          </div>
          <div class="products__info flex">
            <h3 class="products__subtitle">${productsData[order].name}</h3>
            <p class="products__descr">${productsData[order].description}</p>
            <span class="products__price">$${productsData[order].price}</span>
          </div>
        </a>
      </li>
    `;

    // Вставляем карточки в контейнер
    productsContainer.innerHTML += productCards;
    console.log(productsData[order]);
  }
}

getProducts();