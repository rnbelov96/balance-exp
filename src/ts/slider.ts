/* eslint-disable @typescript-eslint/no-use-before-define */
import slideImg1 from '../img/gallery/1.jpg';
import slideImg2 from '../img/gallery/2.jpg';
import slideImg3 from '../img/gallery/3.jpg';
import slideImg4 from '../img/gallery/4.jpg';

const imgEl1 = new Image();
imgEl1.src = slideImg1;

const imgEl2 = new Image();
imgEl2.src = slideImg2;

const imgEl3 = new Image();
imgEl3.src = slideImg3;

const imgEl4 = new Image();
imgEl4.src = slideImg4;

const imageElList = [imgEl1, imgEl2, imgEl3, imgEl4];

let centralImgIndex = 1;

imageElList[0].className = 'slider__slide-1';
imageElList[1].className = 'slider__slide-2';
imageElList[2].className = 'slider__slide-3';

const containerEl = document.querySelector('.slider__container') as HTMLDivElement;

imageElList.slice(0, 3).forEach(img => {
  containerEl.append(img);
});

const nextBtnEl = document.querySelector('.slider__next') as HTMLButtonElement;
const prevBtnEl = document.querySelector('.slider__prev') as HTMLButtonElement;

let wrapperCoords = containerEl.getBoundingClientRect();
let wrapperLeftCoords = wrapperCoords.left;
let wrapperWidth = wrapperCoords.width;

window.addEventListener('resize', () => {
  wrapperCoords = containerEl.getBoundingClientRect();
  wrapperLeftCoords = wrapperCoords.left;
  wrapperWidth = wrapperCoords.width;
});

let posInit: number;
let offset: number;
const translateStep = 25;

const dragAction = (e: MouseEvent) => {
  const posX = e.pageX - wrapperLeftCoords;
  offset = ((posInit - posX) / wrapperWidth) * 100;
};

const swipeAction = (e: TouchEvent) => {
  const posX = e.touches[0].clientX - wrapperLeftCoords;
  offset = ((posInit - posX) / wrapperWidth) * 100;
};

const dragStart = (e: MouseEvent) => {
  posInit = e.pageX - wrapperLeftCoords;
  containerEl.addEventListener('mousemove', dragAction);
  containerEl.addEventListener('touchmove', swipeAction);
};

const swipeStart = (e: TouchEvent) => {
  posInit = e.touches[0].clientX - wrapperLeftCoords;
  containerEl.addEventListener('mousemove', dragAction);
  containerEl.addEventListener('touchmove', swipeAction);
};

const swipeEnd = () => {
  containerEl.removeEventListener('mousemove', dragAction);
  containerEl.removeEventListener('touchmove', swipeAction);

  if (offset < -translateStep / 2) {
    movePrev();
  }

  if (offset > translateStep / 2) {
    moveNext();
  }

  offset = 0;
};

const moveNext = () => {
  containerEl.removeEventListener('mousedown', dragStart);
  containerEl.removeEventListener('touchstart', swipeStart);
  containerEl.removeEventListener('mouseup', swipeEnd);
  containerEl.removeEventListener('touchend', swipeEnd);
  prevBtnEl.disabled = true;
  nextBtnEl.disabled = true;
  setTimeout(() => {
    prevBtnEl.disabled = false;
    nextBtnEl.disabled = false;
    containerEl.addEventListener('mousedown', dragStart);
    containerEl.addEventListener('touchstart', swipeStart);
    containerEl.addEventListener('mouseup', swipeEnd);
    containerEl.addEventListener('touchend', swipeEnd);
  }, 800);

  // Добавили новый слайд
  let imgToAppendIndex = centralImgIndex + 2;
  if (imgToAppendIndex === imageElList.length) {
    imgToAppendIndex = 0;
  } else if (imgToAppendIndex > imageElList.length) {
    imgToAppendIndex = 1;
  }
  imageElList[imgToAppendIndex].className = 'slider__slide-out-right';
  containerEl.append(imageElList[imgToAppendIndex]);

  // Определили индекс левой картинки и запустили отложенное удаление
  let leftImgIndex = centralImgIndex - 1;
  if (leftImgIndex < 0) {
    leftImgIndex = imageElList.length - 1;
  }

  setTimeout(() => {
    imageElList[leftImgIndex].remove();
    imageElList[imgToAppendIndex].className = 'slider__slide-3';
    imageElList[imgToAppendIndex].removeAttribute('style');
  }, 800);

  // Определили индекс правой картинки
  let rightImgIndex = centralImgIndex + 1;
  if (rightImgIndex === imageElList.length) {
    rightImgIndex = 0;
  }

  // // Запустили отложенное смещение слайдов и изменили индекс центральной картинки
  setTimeout(() => {
    imageElList[imgToAppendIndex].style.left = '50%';
    imageElList[leftImgIndex].className = 'slider__slide-out-left';
    imageElList[centralImgIndex].className = 'slider__slide-1';
    imageElList[rightImgIndex].className = 'slider__slide-2';
    centralImgIndex = rightImgIndex;
  }, 50);
};

const movePrev = () => {
  // Добавили и тут же сместили
  containerEl.removeEventListener('mousedown', dragStart);
  containerEl.removeEventListener('touchstart', swipeStart);
  containerEl.removeEventListener('mouseup', swipeEnd);
  containerEl.removeEventListener('touchend', swipeEnd);
  prevBtnEl.disabled = true;
  nextBtnEl.disabled = true;
  setTimeout(() => {
    prevBtnEl.disabled = false;
    nextBtnEl.disabled = false;
    containerEl.addEventListener('mousedown', dragStart);
    containerEl.addEventListener('touchstart', swipeStart);
    containerEl.addEventListener('mouseup', swipeEnd);
    containerEl.addEventListener('touchend', swipeEnd);
  }, 800);

  // Добавили новый слайд
  let imgToAppendIndex = centralImgIndex - 2;
  if (imgToAppendIndex === -2) {
    imgToAppendIndex = imageElList.length - 2;
  } else if (imgToAppendIndex === -1) {
    imgToAppendIndex = imageElList.length - 1;
  }
  imageElList[imgToAppendIndex].className = 'slider__slide-out-left';
  containerEl.append(imageElList[imgToAppendIndex]);

  // Определили индекс правой картинки и запустили отложенное удаление
  let rightImgIndex = centralImgIndex + 1;
  if (rightImgIndex === imageElList.length) {
    rightImgIndex = 0;
  }
  setTimeout(() => {
    imageElList[rightImgIndex].remove();
  }, 800);

  // Определили индекс левой картинки
  let leftImgIndex = centralImgIndex - 1;
  if (leftImgIndex < 0) {
    leftImgIndex = imageElList.length - 1;
  }

  // Запустили отложенное смещение слайдов и изменили индекс центральной картинки
  setTimeout(() => {
    imageElList[rightImgIndex].className = 'slider__slide-out-right';
    imageElList[imgToAppendIndex].className = 'slider__slide-1';
    imageElList[centralImgIndex].className = 'slider__slide-3';
    imageElList[leftImgIndex].className = 'slider__slide-2';
    centralImgIndex = leftImgIndex;
  }, 50);
};

containerEl.addEventListener('mousedown', dragStart);
containerEl.addEventListener('touchstart', swipeStart);
containerEl.addEventListener('mouseup', swipeEnd);
containerEl.addEventListener('touchend', swipeEnd);

nextBtnEl.addEventListener('click', moveNext);
prevBtnEl.addEventListener('click', movePrev);
