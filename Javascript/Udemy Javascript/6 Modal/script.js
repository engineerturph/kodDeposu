'use strict';

const buttons = document.querySelectorAll(`.show-modal`);
const modal = document.querySelector(`.modal`);
const overlay = document.querySelector(`.overlay`);
const btnCloseModal = document.querySelector(`.close-modal`);

const toggleModal = function () {
  modal.classList.toggle(`hidden`);
  overlay.classList.toggle(`hidden`);
};

const removeModal = function () {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
};
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener(`click`, toggleModal);
}

btnCloseModal.addEventListener(`click`, toggleModal);
overlay.addEventListener(`click`, toggleModal);

document.addEventListener(`keydown`, function (e) {
  if (e.key === 'Escape' && !modal.classList.contains(`hidden`)) {
    removeModal();
  }
});
