// document.addEventListener("DOMContentLoaded", function() {
//   document.getElementById("burger").addEventListener("click", function() {

//   });
// });
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('#burger')
  const menuLinks = document.querySelectorAll('.header__link')
  const header = document.querySelector('.header')
  const hide = document.querySelector('body');

  burger.addEventListener('click', () => {
    header.classList.toggle('open')
    hide.classList.toggle('hidden');
  })

  menuLinks.forEach((link) =>
    link.addEventListener('click', () => {
      header.classList.remove('open')
      hide.classList.remove('hidden');
    })
  )
});