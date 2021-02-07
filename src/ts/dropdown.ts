export {};

const dropDownElList = document.querySelectorAll('.questions__item');

dropDownElList.forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('questions__item_opened');
  });
});
