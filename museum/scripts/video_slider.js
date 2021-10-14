export default function videoSlider() {
  const slider = document.querySelector('.video-journey__slider-container'),
    sliderItems = document.querySelectorAll('.video-journey__slider-item'),
    butts = document.querySelector('.video-journey__slider-navigation'),
    paginationItems = Array.from(document.querySelectorAll('.video-journey__pagination-item')),
    player = document.querySelector('.player video'),
    paginationContainer = document.querySelector('.video-journey__pagination');
  let position = 1, processed = false;

  butts.addEventListener('pointerdown', navigationHandler);
  paginationContainer.addEventListener('pointerdown', paginationHandler);

  window.addEventListener('resize', () => {
    slider.style.transition = '';
    setPosition();
  });
  function navigationHandler(event) {
    if (!event.target.closest('.video-journey__slider-navbutton') || processed) return
    processed = true;
    if (event.target.closest('.video-journey__slider-prev')) {
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
  function move(event) {
    stopper();
    slider.style.transition = 'left .4s ease-in-out';
    slider.addEventListener('transitionend', afterMove, { once: true });
    setPosition();
    function afterMove() {
      processed = false;
      if (position === 0 || position === sliderItems.length - 3) checkPosition();
      document.querySelector('.video-journey__item-active').classList.remove('video-journey__item-active');
      paginationItems[position - 1].classList.add('video-journey__item-active');
      slider.style.transition = ''
    }
  }
  function setPosition() {
    const item = getComputedStyle(document.querySelector('.video-journey__slider-item')),
      width = parseInt(item.width, 10),
      gap = parseInt(getComputedStyle(slider).columnGap, 10);
    slider.style.left = `${-position * (width + gap)}px`;
    player.src = `./assets/pictures/video/video${position}.mp4`;
  }
  function checkPosition() {
    if (position === sliderItems.length - 3) position = 1;
    if (position === 0) position = sliderItems.length - 4;
    slider.style.transition = '';
    setPosition();
  }
  function stopper() {
    let iframes = slider.querySelectorAll('iframe');
    iframes.forEach(elem => {
      elem.src = elem.src;
    })
  };
}





