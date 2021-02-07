/* eslint-disable no-param-reassign */
export {};

const closeModal = (modalEl: HTMLDivElement) => {
  modalEl.style.opacity = '0';
  modalEl.style.overflowY = 'inherit';
  modalEl.style.pointerEvents = 'none';
  document.body.style.overflowY = 'auto';
};

const openModal = (modalEl: HTMLDivElement) => {
  modalEl.style.opacity = '1';
  modalEl.style.overflowY = 'auto';
  modalEl.style.pointerEvents = 'auto';
  document.body.style.overflowY = 'hidden';
};

const modalElList = document.querySelectorAll('.modal');
const [policyModalEl, formModalEl] = modalElList;
const formModalWrapper = document.querySelector('.modal__form');
modalElList.forEach(modalEl => {
  modalEl.addEventListener('click', (e: Event) => {
    if (e.target === e.currentTarget || e.target === formModalWrapper) {
      const clickedModal = e.currentTarget as HTMLDivElement;
      closeModal(clickedModal);
    }
  });
});

const closeModalElList = document.querySelectorAll('.modal__close');
closeModalElList.forEach(closeEl => {
  closeEl.addEventListener('click', () => {
    modalElList.forEach(modalEL => {
      closeModal(modalEL as HTMLDivElement);
    });
  });
});

const calcBtnEl = document.querySelector('.calc__btn') as HTMLButtonElement;
calcBtnEl.addEventListener('click', () => {
  openModal(formModalEl as HTMLDivElement);
});

const tableBtnElList = document.querySelectorAll('.table__btn');
tableBtnElList.forEach(el => {
  el.addEventListener('click', () => {
    openModal(formModalEl as HTMLDivElement);
  });
});

const callOrderEl = document.querySelector('.footer__call-order') as HTMLParagraphElement;
callOrderEl.addEventListener('click', () => {
  openModal(formModalEl as HTMLDivElement);
});

const policyCallElList = document.querySelectorAll('.policy');
policyCallElList.forEach(el => {
  el.addEventListener('click', () => {
    openModal(policyModalEl as HTMLDivElement);
  });
});
