export {};

const carouselElList = document.querySelectorAll('.carousel');

carouselElList.forEach(carouselEl => {
  const dotsElList = carouselEl.querySelectorAll('.carousel__dot');
  const carouselListEl = carouselEl.querySelector('.carousel__list') as HTMLUListElement;

  let currentDot = 0;

  dotsElList.forEach((dotEl, index) => {
    dotEl.addEventListener('click', e => {
      const currentTarget = e.currentTarget as HTMLDivElement;
      if (currentDot === index) {
        return;
      }
      carouselListEl.style.transform = `translateX(-${index}00%)`;
      currentTarget.classList.toggle('carousel__dot_current');
      dotsElList[currentDot].classList.toggle('carousel__dot_current');
      currentDot = index;
    });
  });

  let wrapperCoords = carouselListEl.getBoundingClientRect();
  let wrapperLeftCoords = wrapperCoords.left;
  let wrapperWidth = wrapperCoords.width;

  window.addEventListener('resize', () => {
    wrapperCoords = carouselListEl.getBoundingClientRect();
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
    carouselListEl.addEventListener('mousemove', dragAction);
    carouselListEl.addEventListener('touchmove', swipeAction);
  };

  const swipeStart = (e: TouchEvent) => {
    posInit = e.touches[0].clientX - wrapperLeftCoords;
    carouselListEl.addEventListener('mousemove', dragAction);
    carouselListEl.addEventListener('touchmove', swipeAction);
  };

  const swipeEnd = () => {
    carouselListEl.removeEventListener('mousemove', dragAction);
    carouselListEl.removeEventListener('touchmove', swipeAction);

    if (offset < -translateStep / 2 && currentDot !== 0) {
      carouselListEl.style.transform = `translateX(-${currentDot - 1}00%)`;
      dotsElList[currentDot].classList.toggle('carousel__dot_current');
      dotsElList[currentDot - 1].classList.toggle('carousel__dot_current');
      currentDot -= 1;
    }

    if (offset > translateStep / 2 && currentDot !== dotsElList.length - 1) {
      carouselListEl.style.transform = `translateX(-${currentDot + 1}00%)`;
      dotsElList[currentDot].classList.toggle('carousel__dot_current');
      dotsElList[currentDot + 1].classList.toggle('carousel__dot_current');
      currentDot += 1;
    }

    offset = 0;
  };

  carouselListEl.addEventListener('mousedown', dragStart);
  carouselListEl.addEventListener('touchstart', swipeStart);
  carouselListEl.addEventListener('mouseup', swipeEnd);
  carouselListEl.addEventListener('touchend', swipeEnd);
});
