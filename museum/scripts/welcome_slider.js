export default function welcomeSlider() {
  const slider = document.querySelector('.welcome__slider-container'),
    sliderItems = document.querySelectorAll('.welcome__slider-item'),
    butts = document.querySelector('.welcome__slider-buttons'),
    currentNumber = document.querySelector('.welcome__slider-number_current'),
    paginationItems = Array.from(document.querySelectorAll('.welcome__slider-position')),
    paginationContainer = document.querySelector('.welcome__slider-current-position');
  let position = 1, processed = false, dragShift = null;

  document.addEventListener('pointerdown', dragStart);
  butts.addEventListener('pointerdown', navigationHandler);
  paginationContainer.addEventListener('pointerdown', paginationHandler);

  window.addEventListener('resize', () => {
    slider.style.transition = '';
    setPosition();
  });
  slider.ondragstart = function () {
    return false;
  };


  function dragStart(event) {
    if (!document.elementFromPoint(event.pageX, event.pageY) || !document.elementFromPoint(event.pageX, event.pageY).classList.contains('welcome__slider-item') || processed) return
    processed = true;
    const start = event.pageX, initialShift = parseInt(getComputedStyle(slider).left, 10);
    document.addEventListener('pointermove', drag);
    document.addEventListener('pointerup', replacer, { once: true });
    function drag(event) {
      dragShift = start - event.pageX;
      slider.style.left = `${initialShift - dragShift}px`;
    }
    function replacer(event) {
      if (!dragShift) return
      const width = parseInt(getComputedStyle(document.querySelector('.welcome__slider-item')).width, 10);
      document.removeEventListener('pointermove', drag);
      if (dragShift && dragShift < -width / 4) position--
      if (dragShift && dragShift > width / 4) position++
      move();
    }
  };

  function navigationHandler(event) {
    if (!event.target.closest('.welcome__slider-button') || processed) return
    processed = true;
    if (event.target.closest('.welcome__slider-left')) {
      position--;
    } else {
      position++;
    }
    move();
  }
  function paginationHandler(event) {
    if (paginationItems.includes(event.target)) position = event.target.dataset.position;
    move();
  }
  function move(event, drag) {
    slider.style.transition = '.4s ease-in-out';
    setPosition();
    slider.addEventListener('transitionend', afterMove, { once: true });
    function afterMove() {
      processed = false;
      if (position === 0 || position === sliderItems.length - 1) checkPosition();
      currentNumber.innerHTML = `0${position}`;
      document.querySelector('.welcome__slider-position_active').classList.remove('welcome__slider-position_active');
      paginationItems[position - 1].classList.add('welcome__slider-position_active');
      slider.style.transition = ''
    }
  }
  function setPosition() {
    const width = parseInt(getComputedStyle(document.querySelector('.welcome__slider-item')).width, 10);
    slider.style.left = `${-position * width}px`;
  }
  function checkPosition() {
    if (position === sliderItems.length - 1) position = 1;
    if (position === 0) position = sliderItems.length - 2;
    slider.style.transition = '';
    setPosition();
  }
}





